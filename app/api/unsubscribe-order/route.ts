import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-10-29.clover',
})

// Use service role key for admin operations
const supabaseAdmin = process.env.SUPABASE_SERVICE_ROLE_KEY
  ? createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )
  : createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

export async function POST(request: Request) {
  try {
    const { orderId, adminPassword } = await request.json()

    if (!orderId || !adminPassword) {
      return NextResponse.json(
        { error: 'Order ID and admin password are required' },
        { status: 400 }
      )
    }

    // Verify admin password
    if (adminPassword !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Invalid admin password' },
        { status: 401 }
      )
    }

    // Fetch the order
    const { data: order, error: fetchError } = await supabaseAdmin
      .from('bookings')
      .select('id, email, full_name, stripe_customer_id, subscribed')
      .eq('id', orderId)
      .single()

    if (fetchError || !order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    // Check if already unsubscribed
    if (!order.subscribed) {
      return NextResponse.json(
        { error: 'Order is already unsubscribed' },
        { status: 400 }
      )
    }

    // Cancel Stripe subscription if customer ID exists
    if (order.stripe_customer_id) {
      try {
        console.log(`Cancelling subscriptions for customer: ${order.stripe_customer_id}`)
        
        // Get all active subscriptions for this customer
        const subscriptions = await stripe.subscriptions.list({
          customer: order.stripe_customer_id,
          status: 'active',
        })

        // Cancel all active subscriptions
        for (const subscription of subscriptions.data) {
          await stripe.subscriptions.cancel(subscription.id)
          console.log(`✅ Cancelled subscription: ${subscription.id}`)
        }

        console.log(`✅ All subscriptions cancelled for customer: ${order.stripe_customer_id}`)
      } catch (stripeError) {
        console.error('Error cancelling Stripe subscription:', stripeError)
        // Continue with database update even if Stripe fails
        // This ensures the database stays in sync even if Stripe has issues
      }
    }

    // Update subscribed status in database
    const { error: updateError } = await supabaseAdmin
      .from('bookings')
      .update({ 
        subscribed: false,
        updated_at: new Date().toISOString()
      })
      .eq('id', orderId)

    if (updateError) {
      console.error('Error updating order:', updateError)
      return NextResponse.json(
        { error: 'Failed to update order' },
        { status: 500 }
      )
    }

    console.log(`✅ Successfully unsubscribed order ${orderId} for ${order.email}`)

    return NextResponse.json({ 
      success: true,
      message: 'Order unsubscribed successfully'
    })
  } catch (error) {
    console.error('Error in unsubscribe-order:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

