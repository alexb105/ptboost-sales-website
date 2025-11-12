import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import Stripe from 'stripe'

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

          // Update booking with customer ID and set subscribed to true
          const { data, error } = await supabase
            .from('bookings')
            .update({
              stripe_customer_id: customerId,
              subscribed: true,
              payment_status: 'completed',
              updated_at: new Date().toISOString(),
            })
            .eq('stripe_customer_id', customerId)
            .select()

          if (error) {
            console.error('❌ Error updating booking after checkout:', error)
          } else {
            console.log('✅ Booking updated successfully:', data)
          }

          // If this is a resubscription (metadata.type === 'resubscription')
          if (session.metadata?.type === 'resubscription' && session.metadata?.booking_id) {
            console.log('🔄 Resubscription detected for booking:', session.metadata.booking_id)
            
            const { error: resubError } = await supabase
              .from('bookings')
              .update({
                subscribed: true,
                updated_at: new Date().toISOString(),
              })
              .eq('id', session.metadata.booking_id)

            if (resubError) {
              console.error('❌ Error updating resubscription:', resubError)
            } else {
              console.log('✅ Resubscription updated successfully')
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

