import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-10-29.clover',
})

export async function DELETE(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Verify the user's credentials first
    const { data: booking, error: fetchError } = await supabase
      .from('bookings')
      .select('id, email, stripe_customer_id, subscription_password, payment_status')
      .eq('email', email)
      .eq('payment_status', 'completed')
      .not('stripe_customer_id', 'is', null)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (fetchError || !booking) {
      return NextResponse.json(
        { error: 'Account not found or invalid credentials' },
        { status: 404 }
      )
    }

    // Verify password
    if (booking.subscription_password !== password.trim().toUpperCase()) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      )
    }

    // Cancel Stripe subscription if active
    if (booking.stripe_customer_id) {
      try {
        // Get customer's subscriptions
        const subscriptions = await stripe.subscriptions.list({
          customer: booking.stripe_customer_id,
          status: 'active',
          limit: 10,
        })

        // Cancel all active subscriptions
        for (const subscription of subscriptions.data) {
          await stripe.subscriptions.cancel(subscription.id)
          console.log(`Cancelled subscription: ${subscription.id}`)
        }
      } catch (stripeError) {
        console.error('Error cancelling Stripe subscription:', stripeError)
        // Continue with deletion even if Stripe cancellation fails
      }
    }

    // Delete the booking record (this will cascade delete related data if configured)
    const { error: deleteError } = await supabase
      .from('bookings')
      .delete()
      .eq('id', booking.id)

    if (deleteError) {
      console.error('Error deleting account:', deleteError)
      return NextResponse.json(
        { error: 'Failed to delete account' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true,
      message: 'Account and all associated data have been permanently deleted'
    })
  } catch (error) {
    console.error('Error in delete-account:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

