import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { supabase } from '@/lib/supabase'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}))
    const {
      email,
      name = '',
      businessName = '',
      reason = '',
      notes = '',
    } = body || {}

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }
    if (!reason) {
      return NextResponse.json({ error: 'Reason is required' }, { status: 400 })
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured!')
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 })
    }

    const toAddress = 'alexander.ptboost@gmail.com' // intentionally not exposed in UI

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

    const subject = `Cancellation Request: ${email}${businessName ? ` (${businessName})` : ''}`
    const safe = (v: string) => String(v || '').replace(/</g, '&lt;').replace(/>/g, '&gt;')

    await resend.emails.send({
      from: 'PTBoost Notifications <noreply@ptboost.co.uk>',
      to: [toAddress],
      subject,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; color: #111827; }
              .container { max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e5e7eb; }
              .header { background: linear-gradient(135deg, #f97316 0%, #ea580c 50%, #dc2626 100%); color: #fff; padding: 24px; }
              .content { padding: 24px; }
              .row { margin-bottom: 12px; }
              .label { font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: .05em; margin-bottom: 4px; }
              .value { font-size: 15px; font-weight: 600; }
              .box { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px; }
              .mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin:0; font-size:20px;">Subscription Cancellation Request</h1>
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
                  <div class="label">Reason</div>
                  <div class="value">${safe(reason)}</div>
                </div>
                <div class="row">
                  <div class="label">Notes</div>
                  <div class="box">${notes ? safe(notes).replace(/\n/g, '<br/>') : '—'}</div>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    })

    // Send confirmation email to customer
    await resend.emails.send({
      from: 'PTBoost <noreply@ptboost.co.uk>',
      to: [email],
      subject: 'We’ve received your cancellation request',
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
              .mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin:0; font-size:20px;">Cancellation Request Received</h1>
              </div>
              <div class="content">
                <p>Hi ${safe(name) || 'there'},</p>
                <p>We’ve received your request to cancel your subscription.</p>
                <p><strong>Your subscription will be cancelled within 24 hours (Monday–Friday).</strong></p>
                <p>If you submitted this outside of business days, we’ll process it on the next working day.</p>
                ${stripeCustomerId ? `<p>Your Stripe customer ID for reference: <span class="mono">${safe(stripeCustomerId)}</span></p>` : ''}
                <p>— PTBoost</p>
              </div>
            </div>
          </body>
        </html>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending cancellation request:', error)
    return NextResponse.json(
      { error: 'Failed to send cancellation request' },
      { status: 500 }
    )
  }
}


