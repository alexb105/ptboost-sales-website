// email template: follow-up reminder to complete website order (to lead)
import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { supabase } from '@/lib/supabase'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { bookingId, subscriptionLink } = await request.json()

    if (!bookingId) {
      return NextResponse.json(
        { error: 'Booking ID required' },
        { status: 400 }
      )
    }

    if (!subscriptionLink) {
      return NextResponse.json(
        { error: 'Subscription link required' },
        { status: 400 }
      )
    }

    // Fetch booking details
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

    // Check if booking is still pending
    if (booking.payment_status !== 'pending') {
      return NextResponse.json(
        { error: 'Booking is not pending' },
        { status: 400 }
      )
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured!')
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 })
    }

    // Send follow-up email to customer
    console.log('Sending follow-up email to:', booking.email)
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: 'PTBoost <noreply@ptboost.co.uk>',
      to: [booking.email],
      subject: '⏰ Complete Your Website Order - Limited Time Offer!',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #1a1a1a;
                background: linear-gradient(135deg, #fef3e7 0%, #fff5e6 50%, #ffe5e5 100%);
                padding: 20px;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
              }
              .email-container {
                max-width: 650px;
                margin: 0 auto;
                background: #ffffff;
                border-radius: 24px;
                overflow: hidden;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
              }
              .header {
                background: linear-gradient(135deg, #f97316 0%, #ea580c 50%, #dc2626 100%);
                color: white;
                padding: 50px 40px;
                text-align: center;
                position: relative;
                overflow: hidden;
              }
              .header::before {
                content: '';
                position: absolute;
                top: -50%;
                right: -20%;
                width: 300px;
                height: 300px;
                background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
                border-radius: 50%;
              }
              .header-content {
                position: relative;
                z-index: 1;
              }
              .header h1 {
                font-size: 36px;
                font-weight: 900;
                margin: 0 0 15px 0;
                letter-spacing: -0.5px;
                text-shadow: 0 2px 10px rgba(0,0,0,0.1);
              }
              .header p {
                font-size: 20px;
                font-weight: 600;
                margin: 0;
                opacity: 0.95;
              }
              .content {
                padding: 40px;
                background: #ffffff;
              }
              .urgency-badge {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                background: linear-gradient(135deg, #dc2626 0%, #ea580c 100%);
                color: white;
                padding: 12px 24px;
                border-radius: 50px;
                font-weight: 700;
                font-size: 14px;
                margin: 0 auto 30px auto;
                box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
              }
              .urgency-badge-wrapper {
                text-align: center;
                width: 100%;
              }
              .message-card {
                background: linear-gradient(135deg, #fef3e7 0%, #fff5e6 100%);
                padding: 30px;
                border-radius: 16px;
                margin-bottom: 25px;
                border: 2px solid rgba(249, 115, 22, 0.1);
              }
              .message-card p {
                font-size: 17px;
                line-height: 1.7;
                color: #1a1a1a;
                margin: 0 0 15px 0;
                font-weight: 500;
              }
              .message-card p:last-child {
                margin-bottom: 0;
              }
              .button {
                display: inline-block;
                background: linear-gradient(135deg, #f97316 0%, #ea580c 50%, #dc2626 100%);
                color: white;
                padding: 18px 40px;
                text-decoration: none;
                border-radius: 12px;
                font-weight: 800;
                font-size: 18px;
                margin: 25px 0;
                box-shadow: 0 4px 15px rgba(249, 115, 22, 0.4);
                transition: transform 0.2s;
                text-align: center;
                display: block;
                width: 100%;
              }
              .button:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(249, 115, 22, 0.5);
              }
              .benefits-list {
                background: #ffffff;
                padding: 30px;
                border-radius: 16px;
                margin-bottom: 25px;
                border: 2px solid #f3f4f6;
              }
              .benefits-list h3 {
                font-size: 20px;
                font-weight: 800;
                color: #1a1a1a;
                margin: 0 0 20px 0;
                display: flex;
                align-items: center;
                gap: 10px;
              }
              .benefits-list h3::before {
                content: '';
                width: 4px;
                height: 24px;
                background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
                border-radius: 2px;
              }
              .benefits-list ul {
                list-style: none;
                padding: 0;
                margin: 0;
              }
              .benefits-list li {
                padding: 15px 0;
                border-bottom: 1px solid #f3f4f6;
                display: flex;
                align-items: flex-start;
                gap: 12px;
              }
              .benefits-list li:last-child {
                border-bottom: none;
              }
              .benefits-list li::before {
                content: '✓';
                color: #10b981;
                font-weight: 900;
                font-size: 18px;
                flex-shrink: 0;
              }
              .benefits-list li span {
                font-size: 16px;
                line-height: 1.6;
                color: #374151;
                font-weight: 500;
              }
              .footer {
                background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
                color: white;
                padding: 40px;
                text-align: center;
              }
              .footer-brand {
                font-size: 24px;
                font-weight: 900;
                background: linear-gradient(135deg, #f97316 0%, #ea580c 50%, #dc2626 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                margin-bottom: 10px;
              }
              .footer-text {
                font-size: 15px;
                color: #d1d5db;
                margin: 10px 0 0 0;
                line-height: 1.6;
              }
              @media only screen and (max-width: 600px) {
                .email-container {
                  border-radius: 0;
                }
                .header {
                  padding: 40px 30px;
                }
                .header h1 {
                  font-size: 28px;
                }
                .header p {
                  font-size: 18px;
                }
                .content {
                  padding: 30px 25px;
                }
              }
            </style>
          </head>
          <body>
            <div class="email-container">
              <div class="header">
                <div class="header-content">
                  <h1>⏰ Don't Miss Out!</h1>
                  <p>Complete your website order today</p>
                </div>
              </div>
              
              <div class="content">
                <div class="urgency-badge-wrapper">
                  <div class="urgency-badge">
                    🔥 Limited Time - Complete Your Order
                  </div>
                </div>

                <div class="message-card">
                  <p>Hi ${booking.full_name},</p>
                  <p>We noticed you started the process to secure your professional personal trainer website, but haven't completed your payment yet.</p>
                  <p><strong>Your spot is still reserved!</strong> Complete your order now to lock in your £7.99/month subscription and get your custom website delivered within 24-48 hours.</p>
                </div>

                <a href="${subscriptionLink}" class="button">
                  Complete My Order Now →
                </a>

                <div class="benefits-list">
                  <h3>✨ What You'll Get</h3>
                  <ul>
                    <li><span>Custom Professional Website Design tailored to your brand</span></li>
                    <li><span>Mobile Responsive & SEO Optimized for maximum visibility</span></li>
                    <li><span>1 Year Free Hosting Included (save £100+)</span></li>
                    <li><span>Contact Form & Social Media Integration</span></li>
                    <li><span>Fast Delivery - Your website ready in 24-48 hours</span></li>
                    <li><span>Ongoing Support & Updates</span></li>
                  </ul>
                </div>

                <div class="message-card">
                  <p><strong>Why act now?</strong></p>
                  <p>Spots are limited and filling up fast. Complete your order today to ensure you don't miss out on this opportunity to grow your personal training business with a professional online presence.</p>
                </div>
              </div>

              <div class="footer">
                <div class="footer-brand">PTBoost</div>
                <p class="footer-text">
                  Questions? Reply to this email or contact us at <a href="mailto:ptboost.info@gmail.com" style="color: #f97316; text-decoration: none; font-weight: 700;">ptboost.info@gmail.com</a>
                </p>
                <p class="footer-text">
                  This is a one-time follow-up email. If you've already completed your order, please ignore this message.
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
    })

    if (emailError) {
      console.error('Error sending follow-up email:', emailError)
      return NextResponse.json(
        { error: 'Failed to send follow-up email' },
        { status: 500 }
      )
    }

    console.log('Follow-up email sent successfully:', emailData?.id)

    return NextResponse.json({ 
      success: true,
      message: 'Follow-up email sent successfully'
    })
  } catch (error) {
    console.error('Error in send-pending-followup:', error)
    return NextResponse.json(
      { error: 'Failed to send follow-up email' },
      { status: 500 }
    )
  }
}

