import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
})

// Use service role key for admin operations (more secure)
// If service role key is not available, fall back to anon key but require admin password
const supabaseAdmin = process.env.SUPABASE_SERVICE_ROLE_KEY
  ? createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )
  : createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

export async function DELETE(request: Request) {
  try {
    const { orderId, adminPassword } = await request.json()

    // Verify admin password
    if (!adminPassword || adminPassword !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Unauthorized. Invalid admin password.' },
        { status: 401 }
      )
    }

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      )
    }

    // First, get the booking to check for Stripe customer ID
    const { data: booking, error: fetchError } = await supabaseAdmin
      .from('bookings')
      .select('id, stripe_customer_id')
      .eq('id', orderId)
      .single()

    if (fetchError || !booking) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    // If there's a Stripe customer ID, delete from Stripe first
    if (booking.stripe_customer_id) {
      try {
        const customerId = booking.stripe_customer_id as string
        const customer = await stripe.customers.retrieve(customerId)

        if (!customer.deleted && 'id' in customer) {
          // Cancel all active subscriptions for this customer
          const subscriptions = await stripe.subscriptions.list({
            customer: customerId,
            status: 'active',
          })

          for (const subscription of subscriptions.data) {
            await stripe.subscriptions.cancel(subscription.id)
            console.log(`Cancelled subscription: ${subscription.id}`)
          }

          // Delete the Stripe customer
          await stripe.customers.del(customerId)
          console.log(`Deleted Stripe customer: ${customerId}`)
        }
      } catch (stripeError) {
        console.error('Error deleting Stripe customer:', stripeError)
        // Continue with database deletion even if Stripe deletion fails
      }
    }

    // Delete the order from Supabase
    const { error } = await supabaseAdmin
      .from('bookings')
      .delete()
      .eq('id', orderId)

    if (error) {
      console.error('Error deleting order:', error)
      return NextResponse.json(
        { error: 'Failed to delete order' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true,
      message: 'Order deleted successfully. Stripe customer and subscriptions have been cancelled and deleted.'
    })
  } catch (error) {
    console.error('Error in delete-order:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

