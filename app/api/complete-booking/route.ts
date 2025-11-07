import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

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
        alreadyProcessed: true 
      })
    }

    // Update booking status to completed
    const { error: updateError } = await supabase
      .from('bookings')
      .update({ 
        payment_status: 'completed',
        updated_at: new Date().toISOString()
      })
      .eq('id', bookingId)

    if (updateError) {
      console.error('Error updating booking:', updateError)
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
      email: booking.email 
    })
  } catch (error) {
    console.error('Error completing booking:', error)
    return NextResponse.json(
      { error: 'Failed to complete booking' },
      { status: 500 }
    )
  }
}

