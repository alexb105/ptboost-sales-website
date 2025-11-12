import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
})

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Verify user and get their booking data
    const { data: booking, error: fetchError } = await supabase
      .from('bookings')
      .select('id, email, stripe_customer_id, subscription_password, full_name')
      .eq('email', email)
      .eq('payment_status', 'completed')
      .not('stripe_customer_id', 'is', null)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (fetchError || !booking) {
      return NextResponse.json(
        { error: 'No account found for this email' },
        { status: 404 }
      )
    }

    // Verify password
    if (booking.subscription_password !== password.trim().toUpperCase()) {
      return NextResponse.json(
        { error: 'Incorrect subscription password' },
        { status: 401 }
      )
    }

    if (!booking.stripe_customer_id) {
      return NextResponse.json(
        { error: 'No Stripe customer ID found. Please contact support.' },
        { status: 404 }
      )
    }

    // Get the subscription price ID from environment variable
    const priceId = process.env.STRIPE_SUBSCRIPTION_PRICE_ID
    if (!priceId) {
      console.error('STRIPE_SUBSCRIPTION_PRICE_ID not configured')
      return NextResponse.json(
        { error: 'Subscription not configured. Please contact support.' },
        { status: 500 }
      )
    }

    // Create a checkout session with the existing customer ID
    const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://ptboost.co.uk').replace(/\/$/, '')
    
    const session = await stripe.checkout.sessions.create({
      customer: booking.stripe_customer_id, // Use existing customer ID
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/account?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/account?canceled=true`,
      customer_update: {
        address: 'auto',
      },
      // Metadata to track this is a resubscription
      metadata: {
        booking_id: booking.id,
        type: 'resubscription',
      },
      // Allow customer to update payment method
      payment_method_collection: 'if_required',
      // Enable coupon codes for this checkout session
      allow_promotion_codes: true,
    })

    console.log('✅ Created resubscribe checkout session:', session.id, 'for customer:', booking.stripe_customer_id)

    return NextResponse.json({
      sessionUrl: session.url,
      sessionId: session.id,
    })
  } catch (error: any) {
    console.error('❌ Error creating resubscribe session:', error)
    
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session. Please try again.' },
      { status: 500 }
    )
  }
}

