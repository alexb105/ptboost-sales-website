import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import Stripe from 'stripe'
import { decrementCapacity } from '@/app/api/capacity/route'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: Request) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    if (!signature) {
      console.error('❌ No Stripe signature found')
      return NextResponse.json(
        { error: 'No signature' },
        { status: 400 }
      )
    }

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err: any) {
      console.error('❌ Webhook signature verification failed:', err.message)
      return NextResponse.json(
        { error: `Webhook Error: ${err.message}` },
        { status: 400 }
      )
    }

    console.log('✅ Stripe webhook received:', event.type)

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        console.log('💳 Checkout session completed:', session.id)

        if (session.mode === 'subscription') {
          const customerId = session.customer as string
          const subscriptionId = session.subscription as string

          console.log('📝 Updating booking for customer:', customerId)

          // Check if this is a resubscription first
          const isResubscription = session.metadata?.type === 'resubscription'
          
          let bookingData = null
          let isFirstTimeSubscription = false

          if (isResubscription && session.metadata?.booking_id) {
            // For resubscriptions, update by booking_id
            console.log('🔄 Resubscription detected for booking:', session.metadata.booking_id)
            
            const { data, error } = await supabase
              .from('bookings')
              .update({
                stripe_customer_id: customerId,
                subscribed: true,
                subscription_end_date: null, // Clear end date since they're resubscribed
                payment_status: 'completed',
                updated_at: new Date().toISOString(),
              })
              .eq('id', session.metadata.booking_id)
              .select()
              .single()

            if (error) {
              console.error('❌ Error updating resubscription:', error)
            } else {
              bookingData = data
              console.log('✅ Resubscription updated successfully')
            }
          } else {
            // For first-time subscriptions, try to find booking by customer ID first
            let { data, error } = await supabase
              .from('bookings')
              .update({
                stripe_customer_id: customerId,
                subscribed: true,
                payment_status: 'completed',
                updated_at: new Date().toISOString(),
              })
              .eq('stripe_customer_id', customerId)
              .select()

            // If not found by customer ID, try to find by email from Stripe customer
            if ((!data || data.length === 0) && !error) {
              console.log('📧 Booking not found by customer ID, trying to find by email...')
              try {
                const customer = await stripe.customers.retrieve(customerId)
                if (customer && !customer.deleted && 'email' in customer && customer.email) {
                  console.log('📧 Found customer email:', customer.email)
                  
                  // Find pending booking by email
                  const { data: bookingByEmail, error: emailError } = await supabase
                    .from('bookings')
                    .select('*')
                    .eq('email', customer.email)
                    .eq('payment_status', 'pending')
                    .order('created_at', { ascending: false })
                    .limit(1)
                    .single()

                  if (!emailError && bookingByEmail) {
                    console.log('✅ Found pending booking by email:', bookingByEmail.id)
                    // Check if this is a first-time subscription (no stripe_customer_id yet)
                    isFirstTimeSubscription = !bookingByEmail.stripe_customer_id
                    
                    // Update the booking
                    const { data: updatedBooking, error: updateError } = await supabase
                      .from('bookings')
                      .update({
                        stripe_customer_id: customerId,
                        subscribed: true,
                        payment_status: 'completed',
                        updated_at: new Date().toISOString(),
                      })
                      .eq('id', bookingByEmail.id)
                      .select()
                      .single()

                    if (updateError) {
                      console.error('❌ Error updating booking by email:', updateError)
                    } else {
                      bookingData = updatedBooking
                      console.log('✅ Booking updated successfully by email')
                    }
                  } else {
                    console.warn('⚠️ No pending booking found for email:', customer.email)
                  }
                }
              } catch (stripeError) {
                console.error('❌ Error fetching customer from Stripe:', stripeError)
              }
            } else {
              if (error) {
                console.error('❌ Error updating booking after checkout:', error)
              } else if (data && data.length > 0) {
                bookingData = data[0]
                // Check if this was a first-time subscription
                // If booking already had stripe_customer_id, it's not first-time
                isFirstTimeSubscription = false // Already had customer ID, so it's a resubscription
                console.log('✅ Booking updated successfully (existing customer)')
              }
            }
          }

          // Decrement capacity for first-time subscriptions only (not resubscriptions)
          if (!isResubscription && isFirstTimeSubscription) {
            console.log('📉 Decrementing capacity for first-time subscription')
            const capacityResult = await decrementCapacity()
            if (!capacityResult.success) {
              console.error('⚠️ Failed to decrement capacity:', capacityResult.error)
              // Don't fail the webhook if capacity decrement fails, but log it
            }
          } else {
            console.log('ℹ️ Skipping capacity decrement (resubscription or not first-time)')
          }

          // Clean up old canceled subscriptions for resubscriptions
          if (isResubscription && bookingData) {
            try {
              console.log('🧹 Cleaning up old canceled subscriptions for customer:', customerId)
              const subscriptions = await stripe.subscriptions.list({
                customer: customerId,
                status: 'all',
                limit: 100,
              })

              // Find canceled subscriptions (excluding the new active one)
              const canceledSubscriptions = subscriptions.data.filter(sub => 
                sub.status === 'canceled' && sub.id !== subscriptionId
              )

              for (const oldSub of canceledSubscriptions) {
                // Check if subscription period has ended (safe to delete)
                const periodEnd = oldSub.current_period_end
                const now = Math.floor(Date.now() / 1000)
                
                if (periodEnd && periodEnd < now) {
                  console.log(`🗑️ Old canceled subscription ${oldSub.id} period has ended, can be safely ignored`)
                  // Note: Stripe doesn't allow deleting subscriptions, but they're already canceled
                  // This is just for logging - the subscription is already inactive
                } else {
                  console.log(`ℹ️ Old canceled subscription ${oldSub.id} still in period (ends ${new Date(periodEnd * 1000).toISOString()})`)
                }
              }

              if (canceledSubscriptions.length > 0) {
                console.log(`✅ Found ${canceledSubscriptions.length} old canceled subscription(s) - these are now inactive and can be ignored`)
              }
            } catch (cleanupError: any) {
              console.warn('⚠️ Error checking old subscriptions (non-critical):', cleanupError.message)
              // Don't fail the webhook if cleanup check fails
            }
          }
        }
        break
      }

      case 'customer.subscription.created': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string
        
        console.log('✨ Subscription created for customer:', customerId)

        // Set subscribed to true
        const { error } = await supabase
          .from('bookings')
          .update({
            subscribed: true,
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_customer_id', customerId)

        if (error) {
          console.error('❌ Error updating subscription status:', error)
        } else {
          console.log('✅ Subscription status updated to true')
        }
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string
        const status = subscription.status
        
        console.log('🔄 Subscription updated for customer:', customerId, 'Status:', status)

        // Set subscribed based on subscription status
        const isActive = ['active', 'trialing'].includes(status)
        
        const { error } = await supabase
          .from('bookings')
          .update({
            subscribed: isActive,
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_customer_id', customerId)

        if (error) {
          console.error('❌ Error updating subscription status:', error)
        } else {
          console.log(`✅ Subscription status updated to ${isActive}`)
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string
        
        console.log('🗑️ Subscription deleted for customer:', customerId)

        // Set subscribed to false
        const { error } = await supabase
          .from('bookings')
          .update({
            subscribed: false,
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_customer_id', customerId)

        if (error) {
          console.error('❌ Error updating subscription status:', error)
        } else {
          console.log('✅ Subscription status updated to false')
        }
        break
      }

      case 'customer.subscription.paused': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string
        
        console.log('⏸️ Subscription paused for customer:', customerId)

        // Set subscribed to false when paused
        const { error } = await supabase
          .from('bookings')
          .update({
            subscribed: false,
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_customer_id', customerId)

        if (error) {
          console.error('❌ Error updating subscription status:', error)
        } else {
          console.log('✅ Subscription status updated to false (paused)')
        }
        break
      }

      case 'customer.subscription.resumed': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string
        
        console.log('▶️ Subscription resumed for customer:', customerId)

        // Set subscribed to true when resumed
        const { error } = await supabase
          .from('bookings')
          .update({
            subscribed: true,
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_customer_id', customerId)

        if (error) {
          console.error('❌ Error updating subscription status:', error)
        } else {
          console.log('✅ Subscription status updated to true (resumed)')
        }
        break
      }

      default:
        console.log(`ℹ️ Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error('❌ Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

