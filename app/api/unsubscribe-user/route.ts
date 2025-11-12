import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { Resend } from 'resend'
import { getUnsubscribeNotificationEmail } from '@/emails/unsubscribe-notification'

const resend = new Resend(process.env.RESEND_API_KEY)

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
        { error: 'Failed to unsubscribe user' },
        { status: 500 }
      )
    }

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

