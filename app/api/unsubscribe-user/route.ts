import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { Resend } from 'resend'
import { getUnsubscribeNotificationEmail } from '@/emails/unsubscribe-notification'
import { getEmailOptions } from '@/lib/email-helpers'
import Stripe from 'stripe'

const resend = new Resend(process.env.RESEND_API_KEY)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
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

    let subscriptionEndDate: string | null = null

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

      // Also check canceled subscriptions for end date (in case already canceled but DB not updated)
      const canceledSubscriptions = subscriptions.data.filter(sub => 
        sub.status === 'canceled' && sub.current_period_end
      )

      if (activeSubscriptions.length === 0) {
        console.log('⚠️ No active subscriptions found to cancel')
        
        // If already canceled, try to get end date from canceled subscription
        if (canceledSubscriptions.length > 0) {
          const mostRecentCanceled = canceledSubscriptions.sort((a, b) => 
            (b.current_period_end || 0) - (a.current_period_end || 0)
          )[0]
          
          if (mostRecentCanceled.current_period_end) {
            const endDate = new Date(mostRecentCanceled.current_period_end * 1000)
            subscriptionEndDate = endDate.toISOString()
            console.log(`📅 Found end date from canceled subscription: ${endDate.toISOString()}`)
            console.log(`⏰ Days remaining: ${Math.ceil((endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days`)
          }
        }
      }

      for (const subscription of activeSubscriptions) {
        console.log(`🗑️ Canceling subscription: ${subscription.id} (status: ${subscription.status})`)
        
        // IMPORTANT: Get the end date BEFORE canceling
        const currentPeriodEnd = subscription.current_period_end
        if (!currentPeriodEnd) {
          console.warn(`⚠️ Subscription ${subscription.id} has no current_period_end, skipping end date capture`)
          continue
        }
        
        const endDate = new Date(currentPeriodEnd * 1000) // Convert Unix timestamp to Date
        const daysRemaining = Math.ceil((endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
        
        console.log(`📅 Subscription ends: ${endDate.toISOString()}`)
        console.log(`⏰ Days remaining: ${daysRemaining} days`)
        
        // Store the earliest end date (in case of multiple subscriptions)
        if (!subscriptionEndDate || endDate.toISOString() < subscriptionEndDate) {
          subscriptionEndDate = endDate.toISOString()
        }
        
        // Cancel but let it run until period end (customer-friendly)
        await stripe.subscriptions.cancel(subscription.id)
        
        console.log(`✅ Successfully canceled subscription: ${subscription.id}`)
        console.log(`   Will remain active until: ${endDate.toLocaleDateString()}`)
      }

      console.log('✅ All Stripe subscriptions canceled')
    } catch (stripeError: any) {
      console.error('❌ Error canceling Stripe subscription:', stripeError)
      return NextResponse.json(
        { error: `Failed to cancel subscription in Stripe: ${stripeError.message}` },
        { status: 500 }
      )
    }

    // Update the booking to set subscribed = false AND store end date
    const { error: updateError } = await supabase
      .from('bookings')
      .update({ 
        subscribed: false,
        subscription_end_date: subscriptionEndDate,
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
    if (subscriptionEndDate) {
      console.log(`✅ Subscription end date stored: ${subscriptionEndDate}`)
    }

    // Send unsubscribe notification email
    try {
      const emailHtml = getUnsubscribeNotificationEmail({
        fullName: order.full_name,
        email: order.email,
        businessName: order.business_name,
        siteUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://ptboost.co.uk'
      })

      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ptboost.co.uk'
      const unsubscribeUrl = `${baseUrl.replace(/\/$/, '')}/account?action=unsubscribe`
      
      const emailResponse = await resend.emails.send(
        getEmailOptions({
          from: 'PTBoost <noreply@ptboost.co.uk>',
          to: order.email,
          subject: 'Your Subscription Has Been Cancelled - PTBoost',
          html: emailHtml,
          replyTo: 'ptboost.info@gmail.com',
          unsubscribeUrl: unsubscribeUrl,
          tags: [{ name: 'email_type', value: 'unsubscribe_notification' }],
        })
      )

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

