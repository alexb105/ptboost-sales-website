import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { supabase } from '@/lib/supabase'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: Request) {
  const body = await request.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    console.log('Payment successful:', session.id)
    console.log('Customer ID:', session.customer)
    console.log('Customer email:', session.customer_details?.email)

    // Store the Stripe customer ID in the most recent booking for this email
    // Try both pending and completed statuses (in case success page already marked it)
    if (session.customer && session.customer_details?.email) {
      try {
        // First try to update pending bookings
        const { data: pendingBooking, error: pendingError } = await supabase
          .from('bookings')
          .update({
            stripe_customer_id: session.customer as string,
            stripe_session_id: session.id
          })
          .eq('email', session.customer_details.email)
          .eq('payment_status', 'pending')
          .order('created_at', { ascending: false })
          .limit(1)
          .select()

        // If no pending booking found, update completed bookings
        if (!pendingBooking || pendingBooking.length === 0) {
          const { error: completedError } = await supabase
            .from('bookings')
            .update({
              stripe_customer_id: session.customer as string,
              stripe_session_id: session.id
            })
            .eq('email', session.customer_details.email)
            .eq('payment_status', 'completed')
            .is('stripe_customer_id', null) // Only update if customer_id is null
            .order('created_at', { ascending: false })
            .limit(1)

          if (completedError) {
            console.error('Error updating completed booking customer ID:', completedError)
          } else {
            console.log(`Stored customer ID ${session.customer} for completed booking: ${session.customer_details.email}`)
          }
        } else {
          console.log(`Stored customer ID ${session.customer} for pending booking: ${session.customer_details.email}`)
        }
      } catch (error) {
        console.error('Error storing customer ID:', error)
      }
    }
  }

  // Handle subscription created event (for Payment Links that create subscriptions)
  if (event.type === 'customer.subscription.created') {
    const subscription = event.data.object as Stripe.Subscription
    console.log('Subscription created:', subscription.id)
    console.log('Customer ID:', subscription.customer)

    // Try to find and update booking with this customer ID
    if (subscription.customer) {
      try {
        // Get customer details to find by email
        const customer = await stripe.customers.retrieve(subscription.customer as string)
        if (customer && !customer.deleted && 'email' in customer && customer.email) {
          const { error: updateError } = await supabase
            .from('bookings')
            .update({
              stripe_customer_id: subscription.customer as string
            })
            .eq('email', customer.email)
            .is('stripe_customer_id', null) // Only update if null
            .order('created_at', { ascending: false })
            .limit(1)

          if (updateError) {
            console.error('Error updating customer ID from subscription:', updateError)
          } else {
            console.log(`Stored customer ID ${subscription.customer} from subscription for: ${customer.email}`)
          }
        }
      } catch (error) {
        console.error('Error handling subscription created:', error)
      }
    }
  }

    // Decrement capacity count
    try {
      // First, get the current capacity
      const { data: currentData, error: fetchError } = await supabase
        .from('capacity_status')
        .select('capacity_count')
        .single()

      if (fetchError) {
        console.error('Error fetching capacity:', fetchError)
        return NextResponse.json(
          { error: 'Failed to fetch capacity' },
          { status: 500 }
        )
      }

      const newCapacity = Math.max(0, currentData.capacity_count - 1)

      // Update the capacity
      const { error: updateError } = await supabase
        .from('capacity_status')
        .update({
          capacity_count: newCapacity,
          updated_at: new Date().toISOString()
        })
        .eq('id', 1)

      if (updateError) {
        console.error('Error updating capacity:', updateError)
        return NextResponse.json(
          { error: 'Failed to update capacity' },
          { status: 500 }
        )
      }

      console.log(`Capacity decremented from ${currentData.capacity_count} to ${newCapacity}`)
    } catch (error) {
      console.error('Error handling capacity decrement:', error)
      // Don't fail the webhook if capacity update fails
      // The payment still went through
    }
  }

  // Handle subscription cancellation events
  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object as Stripe.Subscription
    console.log('Subscription cancelled:', subscription.id)
    console.log('Customer ID:', subscription.customer)

    // Optional: Update your database to mark subscription as cancelled
    // You could add a subscription_status column and update it here
  }

  return NextResponse.json({ received: true })
}

