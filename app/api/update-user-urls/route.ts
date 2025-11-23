import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    const { email, password, adminDashboardUrl, visitWebsiteUrl } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Verify the user first
    const { data: booking, error: fetchError } = await supabase
      .from('bookings')
      .select('id, subscription_password')
      .eq('email', email)
      .eq('payment_status', 'completed')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (fetchError || !booking) {
      return NextResponse.json(
        { error: 'User not found' },
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

    // Update the URLs
    const updateData: { admin_dashboard_url?: string | null, visit_website_url?: string | null } = {}
    
    if (adminDashboardUrl !== undefined) {
      updateData.admin_dashboard_url = adminDashboardUrl || null
    }
    
    if (visitWebsiteUrl !== undefined) {
      updateData.visit_website_url = visitWebsiteUrl || null
    }

    const { error: updateError } = await supabase
      .from('bookings')
      .update(updateData)
      .eq('id', booking.id)

    if (updateError) {
      console.error('Error updating URLs:', updateError)
      return NextResponse.json(
        { error: 'Failed to update URLs' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true,
      message: 'URLs updated successfully'
    })
  } catch (error: any) {
    console.error('❌ Error updating URLs:', error)
    
    return NextResponse.json(
      { error: 'Failed to update URLs. Please try again.' },
      { status: 500 }
    )
  }
}

