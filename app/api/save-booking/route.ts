import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { generateSubscriptionPassword } from '@/lib/generate-password'

export async function POST(request: Request) {
  try {
    const formData = await request.json()

    // Generate unique subscription password
    const subscriptionPassword = generateSubscriptionPassword()

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
        images: formData.images || [],
        payment_status: 'pending',
        email_sent: false,
        subscription_password: subscriptionPassword,
        subscribed: false // Initially not subscribed until payment completes
      })
      .select('id, subscription_password')
      .single()

    if (error) {
      console.error('Error saving booking:', error)
      return NextResponse.json(
        { error: 'Failed to save booking' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      bookingId: data.id,
      subscriptionPassword: data.subscription_password
    })
  } catch (error) {
    console.error('Error in save-booking:', error)
    return NextResponse.json(
      { error: 'Failed to save booking' },
      { status: 500 }
    )
  }
}

