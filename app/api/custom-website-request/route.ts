import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { supabase } from '@/lib/supabase'
import { getEmailOptions } from '@/lib/email-helpers'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}))
    const {
      email,
      name = '',
      businessName = '',
      requestDetails = '',
    } = body || {}

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }
    if (!requestDetails || !requestDetails.trim()) {
      return NextResponse.json({ error: 'Request details are required' }, { status: 400 })
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured!')
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 })
    }

    const toAddress = 'alexander.ptboost@gmail.com'

    // Lookup Stripe customer id for context
    let stripeCustomerId: string | null = null
    try {
      const { data: booking } = await supabase
        .from('bookings')
        .select('stripe_customer_id')
        .eq('email', email)
        .eq('payment_status', 'completed')
        .not('stripe_customer_id', 'is', null)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle()
      stripeCustomerId = booking?.stripe_customer_id ?? null
    } catch (e) {
      // Non-fatal; continue without ID
    }

    const subject = `Custom Website Change Request: ${email}${businessName ? ` (${businessName})` : ''}`
    const safe = (v: string) => String(v || '').replace(/</g, '&lt;').replace(/>/g, '&gt;')

    // Send email to admin
    await resend.emails.send(
      getEmailOptions({
        from: 'PTBoost Notifications <noreply@ptboost.co.uk>',
        to: [toAddress],
        subject,
        replyTo: 'ptboost.info@gmail.com',
        tags: [{ name: 'email_type', value: 'admin_custom_request' }],
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; color: #111827; }
              .container { max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e5e7eb; }
              .header { background: linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%); color: #fff; padding: 24px; }
              .content { padding: 24px; }
              .row { margin-bottom: 12px; }
              .label { font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: .05em; margin-bottom: 4px; }
              .value { font-size: 15px; font-weight: 600; }
              .box { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px; white-space: pre-wrap; }
              .mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin:0; font-size:20px;">Custom Website Change Request</h1>
              </div>
              <div class="content">
                <div class="row">
                  <div class="label">Customer</div>
                  <div class="value">${safe(name) || 'N/A'} — ${safe(email)}</div>
                </div>
                ${businessName ? `
                  <div class="row">
                    <div class="label">Business</div>
                    <div class="value">${safe(businessName)}</div>
                  </div>` : ''}
                <div class="row">
                  <div class="label">Stripe Customer ID</div>
                  <div class="value mono">${stripeCustomerId ? safe(stripeCustomerId) : 'Not found'}</div>
                </div>
                <div class="row">
                  <div class="label">Request Details</div>
                  <div class="box">${safe(requestDetails).replace(/\n/g, '<br/>')}</div>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
      })
    )

    // Send confirmation email to customer
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ptboost.co.uk'
    const unsubscribeUrl = `${baseUrl.replace(/\/$/, '')}/account?action=unsubscribe`
    
    await resend.emails.send(
      getEmailOptions({
        from: 'PTBoost <noreply@ptboost.co.uk>',
        to: [email],
        subject: 'We\'ve received your custom website change request',
        replyTo: 'ptboost.info@gmail.com',
        unsubscribeUrl: unsubscribeUrl,
        tags: [{ name: 'email_type', value: 'custom_request_confirmation' }],
        html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; color: #111827; }
              .container { max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e5e7eb; }
              .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #fff; padding: 24px; }
              .content { padding: 24px; line-height: 1.65; }
              .info-box { background: #eff6ff; border-left: 4px solid #3b82f6; padding: 16px; margin: 20px 0; border-radius: 8px; }
              .info-box p { margin: 0; font-size: 15px; color: #1e40af; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin:0; font-size:20px;">Request Received</h1>
              </div>
              <div class="content">
                <p>Hi ${safe(name) || 'there'},</p>
                <p>We've received your custom website change request and it's being reviewed by our team.</p>
                <div class="info-box">
                  <p><strong>⏰ Response Time:</strong> You can expect a response within 24 hours, Monday through Friday.</p>
                </div>
                <p><strong>💰 Pricing:</strong> The cost for your custom changes will vary depending on the complexity of the modifications. We'll provide a detailed quote after reviewing your request.</p>
                <p><strong>💡 Reminder:</strong> If you need minor content changes (updating text, images, or basic information), these can be done for free using your PT website dashboard. Custom changes are for modifications beyond what's available in your dashboard.</p>
                <p>We'll review your request and get back to you as soon as possible with a quote and timeline. If you have any urgent questions, feel free to reach out to us.</p>
                <p>Thank you for your patience!</p>
                <p>— PTBoost Team</p>
              </div>
            </div>
          </body>
        </html>
      `,
      })
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending custom website request:', error)
    return NextResponse.json(
      { error: 'Failed to send request' },
      { status: 500 }
    )
  }
}

