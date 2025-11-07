import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    const formData = await request.json()

    // Insert booking data into Supabase
    const { data, error } = await supabase
      .from('bookings')
      .insert({
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        business_name: formData.businessName,
        location: formData.location,
        specialization: formData.specialization,
        preferred_colors: formData.preferredColors || 'Not specified',
        website_goals: formData.websiteGoals || 'Not specified',
        additional_notes: formData.additionalNotes || 'Not specified',
        payment_status: 'pending',
        email_sent: false
      })
      .select('id')
      .single()

    if (error) {
      console.error('Error saving booking:', error)
      return NextResponse.json(
        { error: 'Failed to save booking' },
        { status: 500 }
      )
    }

    return NextResponse.json({ bookingId: data.id })
  } catch (error) {
    console.error('Error in save-booking:', error)
    return NextResponse.json(
      { error: 'Failed to save booking' },
      { status: 500 }
    )
  }
}

