import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import Stripe from 'stripe'
import { decrementCapacity } from '@/app/api/capacity/route'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
})

export async function POST(request: Request) {
  try {
    const { bookingId } = await request.json()

    console.log('Complete booking called with ID:', bookingId)

    if (!bookingId) {
      console.error('No booking ID provided')
      return NextResponse.json(
        { error: 'Booking ID required' },
        { status: 400 }
      )
    }

    // Get the booking data
    const { data: booking, error: fetchError } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', bookingId)
      .single()

    if (fetchError || !booking) {
      console.error('Error fetching booking:', fetchError)
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      )
    }

    // Security check: Only process if payment is pending (not already completed)
    if (booking.payment_status === 'completed') {
      console.log('Booking already completed, skipping')
      return NextResponse.json({ 
        success: true,
        email: booking.email,
        subscriptionPassword: booking.subscription_password,
        alreadyProcessed: true 
      })
    }

    // Check if this is a first-time subscription before updating
    // (no stripe_customer_id means it's a new subscription)
    const isFirstTimeSubscription = !booking.stripe_customer_id

    // Update booking status to completed and set subscribed to true
    const { error: updateError } = await supabase
      .from('bookings')
      .update({ 
        payment_status: 'completed',
        subscribed: true, // User is now subscribed
        updated_at: new Date().toISOString()
      })
      .eq('id', bookingId)

    if (updateError) {
      console.error('Error updating booking:', updateError)
    } else {
      // Decrement capacity for first-time subscriptions only
      // Note: This is a backup - the webhook should handle this primarily
      // But if webhook hasn't run yet, this ensures capacity is decremented
      if (isFirstTimeSubscription) {
        console.log('📉 Decrementing capacity for first-time subscription (backup from complete-booking)')
        const capacityResult = await decrementCapacity()
        if (!capacityResult.success) {
          console.error('⚠️ Failed to decrement capacity:', capacityResult.error)
          // Don't fail the request if capacity decrement fails, but log it
        }
      } else {
        console.log('ℹ️ Skipping capacity decrement - customer already has stripe_customer_id (likely resubscription)')
      }
    }

    // If customer ID is missing, try to fetch it from Stripe
    if (!booking.stripe_customer_id) {
      console.log('Customer ID missing, attempting to fetch from Stripe...')
      try {
        // Search for customer by email in Stripe
        const customers = await stripe.customers.list({
          email: booking.email,
          limit: 1,
        })

        if (customers.data.length > 0) {
          const customerId = customers.data[0].id
          console.log(`Found customer ID ${customerId} for ${booking.email}`)
          
          // Update booking with customer ID
          const { error: customerUpdateError } = await supabase
            .from('bookings')
            .update({ stripe_customer_id: customerId })
            .eq('id', bookingId)

          if (customerUpdateError) {
            console.error('Error updating customer ID:', customerUpdateError)
          } else {
            console.log(`Successfully stored customer ID ${customerId}`)
            // Update local booking object for return value
            booking.stripe_customer_id = customerId
          }
        } else {
          console.warn(`No customer found in Stripe for email: ${booking.email}`)
        }
      } catch (stripeError) {
        console.error('Error fetching customer from Stripe:', stripeError)
        // Don't fail the whole request if Stripe lookup fails
      }
    }

    // Only send email if not already sent
    if (!booking.email_sent) {
      console.log('Attempting to send email...')
      
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ptboost.co.uk'
      console.log('Using base URL:', baseUrl)
      
      const emailResponse = await fetch(`${baseUrl}/api/send-booking-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: booking.full_name,
          email: booking.email,
          phone: booking.phone,
          businessName: booking.business_name,
          location: booking.location,
          specialization: booking.specialization,
          preferredColors: booking.preferred_colors,
          websiteGoals: booking.website_goals,
          additionalNotes: booking.additional_notes,
          sessionId: bookingId,
          subscriptionPassword: booking.subscription_password,
        }),
      })

      if (!emailResponse.ok) {
        const emailError = await emailResponse.text()
        console.error('Failed to send email:', emailResponse.status, emailError)
      } else {
        // Mark email as sent
        await supabase
          .from('bookings')
          .update({ email_sent: true })
          .eq('id', bookingId)
        
        console.log('Email sent successfully for booking:', bookingId)
      }
    } else {
      console.log('Email already sent for booking:', bookingId)
    }

    return NextResponse.json({ 
      success: true,
      email: booking.email,
      subscriptionPassword: booking.subscription_password
    })
  } catch (error) {
    console.error('Error completing booking:', error)
    return NextResponse.json(
      { error: 'Failed to complete booking' },
      { status: 500 }
    )
  }
}

