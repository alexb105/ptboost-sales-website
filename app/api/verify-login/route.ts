import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

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
      .select('id, full_name, email, business_name, stripe_customer_id, subscription_password, created_at, website_owned, subscribed')
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

    // Return user data (without sensitive info)
    return NextResponse.json({ 
      success: true,
      user: {
        id: booking.id,
        name: booking.full_name,
        email: booking.email,
        businessName: booking.business_name,
        hasActiveSubscription: !!booking.stripe_customer_id,
        websiteOwned: !!booking.website_owned,
        subscribed: !!booking.subscribed // Current subscription status
      }
    })
  } catch (error: any) {
    console.error('❌ Error verifying login:', error)
    
    return NextResponse.json(
      { error: 'Authentication failed. Please try again.' },
      { status: 500 }
    )
  }
}

