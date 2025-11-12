import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabase } from '@/lib/supabase'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-10-29.clover',
})

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    if (!password) {
      return NextResponse.json(
        { error: 'Subscription password is required' },
        { status: 400 }
      )
    }

    // Find the booking with this email and password
    const { data: booking, error: fetchError } = await supabase
      .from('bookings')
      .select('stripe_customer_id, subscription_password')
      .eq('email', email)
      .eq('payment_status', 'completed')
      .not('stripe_customer_id', 'is', null)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (fetchError || !booking) {
      return NextResponse.json(
        { error: 'No active subscription found for this email' },
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
        { error: 'No customer ID found for this subscription' },
        { status: 404 }
      )
    }

    // Create a portal session
    console.log('Creating portal session for customer:', booking.stripe_customer_id)
    
    // Ensure base URL doesn't have trailing slash to avoid double slashes
    const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://ptboost.co.uk').replace(/\/$/, '')
    const returnUrl = `${baseUrl}/account?success=true`
    
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: booking.stripe_customer_id,
      return_url: returnUrl,
    })

    console.log('Portal session created successfully:', portalSession.id)
    return NextResponse.json({ url: portalSession.url })
  } catch (error: any) {
    console.error('❌ Error creating portal session:', error)
    console.error('Error type:', error?.type)
    console.error('Error message:', error?.message)
    console.error('Error code:', error?.code)
    
    // Return more detailed error for debugging
    const errorMessage = error?.message || 'Failed to create portal session'
    return NextResponse.json(
      { error: errorMessage, details: error?.type },
      { status: 500 }
    )
  }
}
