import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { Resend } from 'resend'
import { getUnsubscribeNotificationEmail } from '@/emails/unsubscribe-notification'
import Stripe from 'stripe'

const resend = new Resend(process.env.RESEND_API_KEY)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-10-29.clover',
})

export async function POST(request: Request) {
  try {
    const { orderId, adminPassword } = await request.json()

    // Verify admin password
    if (adminPassword !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      )
    }

    // Get the order details
    const { data: order, error: fetchError } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', orderId)
      .single()

    if (fetchError || !order) {
      console.error('Error fetching order:', fetchError)
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    // Check if already unsubscribed
    if (order.subscribed === false) {
      return NextResponse.json(
        { error: 'User is already unsubscribed' },
        { status: 400 }
      )
    }

    // Check if user has a Stripe customer ID
    if (!order.stripe_customer_id) {
      return NextResponse.json(
        { error: 'No Stripe customer ID found for this user' },
        { status: 404 }
      )
    }

    console.log('🔍 Fetching Stripe subscriptions for customer:', order.stripe_customer_id)

    // Cancel all active subscriptions in Stripe
    try {
      // List all subscriptions for this customer
      const subscriptions = await stripe.subscriptions.list({
        customer: order.stripe_customer_id,
        status: 'all',
      })

      console.log(`📋 Found ${subscriptions.data.length} subscriptions for customer`)

      // Cancel all active subscriptions
      const activeSubscriptions = subscriptions.data.filter(sub => 
        ['active', 'trialing', 'past_due'].includes(sub.status)
      )

      if (activeSubscriptions.length === 0) {
        console.log('⚠️ No active subscriptions found to cancel')
      }

      for (const subscription of activeSubscriptions) {
        console.log(`🗑️ Canceling subscription: ${subscription.id} (status: ${subscription.status})`)
        
        await stripe.subscriptions.cancel(subscription.id)
        
        console.log(`✅ Successfully canceled subscription: ${subscription.id}`)
      }

      console.log('✅ All Stripe subscriptions canceled')
    } catch (stripeError: any) {
      console.error('❌ Error canceling Stripe subscription:', stripeError)
      return NextResponse.json(
        { error: `Failed to cancel subscription in Stripe: ${stripeError.message}` },
        { status: 500 }
      )
    }

    // Update the booking to set subscribed = false
    const { error: updateError } = await supabase
      .from('bookings')
      .update({ 
        subscribed: false,
        updated_at: new Date().toISOString()
      })
      .eq('id', orderId)

    if (updateError) {
      console.error('Error updating booking:', updateError)
      return NextResponse.json(
        { error: 'Failed to update database after canceling subscription' },
        { status: 500 }
      )
    }

    console.log('✅ Database updated: subscribed = false')

    // Send unsubscribe notification email
    try {
      const emailHtml = getUnsubscribeNotificationEmail({
        fullName: order.full_name,
        email: order.email,
        businessName: order.business_name,
        siteUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://ptboost.co.uk'
      })

      const emailResponse = await resend.emails.send({
        from: 'PTBoost <noreply@ptboost.co.uk>',
        to: order.email,
        subject: '⚠️ Your Subscription Has Been Cancelled - PTBoost',
        html: emailHtml,
      })

      console.log('✅ Unsubscribe notification email sent:', emailResponse)
    } catch (emailError) {
      console.error('❌ Error sending unsubscribe email:', emailError)
      // Don't fail the request if email fails
      // The subscription is already cancelled in the database
    }

    return NextResponse.json({ 
      success: true,
      message: 'User unsubscribed successfully and notification email sent'
    })
  } catch (error: any) {
    console.error('❌ Error in unsubscribe-user API:', error)
    
    return NextResponse.json(
      { error: 'Failed to unsubscribe user. Please try again.' },
      { status: 500 }
    )
  }
}

