// email template: internal notification when a new lead requests notification (to you)
import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getEmailOptions } from '@/lib/email-helpers'

const resend = new Resend(process.env.RESEND_API_KEY)

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: Request) {
  try {
    const { name, email } = await request.json()

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      )
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Save to waiting list in Supabase
    const { error: dbError } = await supabase
      .from('waiting_list')
      .insert([{ name: name.trim(), email }])

    if (dbError) {
      console.error('Error saving to waiting list:', dbError)
      // Continue with email sending even if DB save fails
    }

    // Send notification to you (business owner)
    await resend.emails.send(
      getEmailOptions({
        from: 'PTBoost Notifications <noreply@ptboost.co.uk>',
        to: 'ptboost.info@gmail.com',
        subject: 'New Lead: Someone Wants to Be Notified!',
        replyTo: 'ptboost.info@gmail.com',
        tags: [{ name: 'email_type', value: 'admin_notification' }],
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
                background: linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%);
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
              .alert-badge {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
                color: white;
                padding: 12px 24px;
                border-radius: 50px;
                font-weight: 700;
                font-size: 14px;
                margin-bottom: 30px;
                box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
              }
              .section {
                background: #ffffff;
                padding: 30px;
                border-radius: 16px;
                margin-bottom: 25px;
                border: 2px solid #f3f4f6;
              }
              .details-grid {
                display: grid;
                gap: 15px;
                margin-top: 20px;
              }
              .detail-item {
                padding: 18px;
                background: #f9fafb;
                border-radius: 12px;
                border-left: 4px solid #3b82f6;
              }
              .detail-label {
                font-size: 12px;
                font-weight: 700;
                color: #6b7280;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 8px;
              }
              .detail-value {
                font-size: 16px;
                font-weight: 600;
                color: #1a1a1a;
                word-break: break-word;
              }
              .detail-value a {
                color: #3b82f6;
                text-decoration: none;
                font-weight: 700;
              }
              .detail-value a:hover {
                text-decoration: underline;
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
                  <h1>🔔 New Lead!</h1>
                  <p>Someone wants to be notified</p>
                </div>
              </div>
              
              <div class="content">
                <div class="alert-badge">
                  ⚡ Action Required
                </div>

                <div class="section">
                  <h2 style="font-size: 20px; font-weight: 800; color: #1a1a1a; margin: 0 0 20px 0; display: flex; align-items: center; gap: 10px;">
                    <span style="width: 4px; height: 24px; background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); border-radius: 2px;"></span>
                    👤 Lead Information
                  </h2>
                  <div class="details-grid">
                    <div class="detail-item">
                      <div class="detail-label">Name</div>
                      <div class="detail-value">${name}</div>
                    </div>
                    <div class="detail-item">
                      <div class="detail-label">Email</div>
                      <div class="detail-value"><a href="mailto:${email}">${email}</a></div>
                    </div>
                    <div class="detail-item">
                      <div class="detail-label">Requested</div>
                      <div class="detail-value">${new Date().toLocaleString()}</div>
                    </div>
                  </div>
          </div>
          
                <div class="section" style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-color: #3b82f6;">
                  <p style="margin: 0; font-size: 16px; color: #1e3a8a; line-height: 1.7; font-weight: 600;">
                    💡 <strong>Next Step:</strong> Reach out to ${name} when you have spots available!
                  </p>
                </div>
              </div>

              <div class="footer">
                <div class="footer-brand">PTBoost</div>
                <p class="footer-text">
                  This notification was sent from your PTBoost website
          </p>
        </div>
            </div>
          </body>
        </html>
      `,
      })
    )

    // Send confirmation email to the user
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ptboost.co.uk'
    const unsubscribeUrl = `${baseUrl.replace(/\/$/, '')}/account?action=unsubscribe`
    
    await resend.emails.send(
      getEmailOptions({
        from: 'PTBoost <noreply@ptboost.co.uk>',
        to: email,
        subject: 'You\'re on the List!',
        replyTo: 'ptboost.info@gmail.com',
        unsubscribeUrl: unsubscribeUrl,
        tags: [{ name: 'email_type', value: 'waiting_list_confirmation' }],
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
              .header::after {
                content: '';
                position: absolute;
                bottom: -30%;
                left: -10%;
                width: 250px;
                height: 250px;
                background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%);
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
              .success-badge {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                color: white;
                padding: 12px 24px;
                border-radius: 50px;
                font-weight: 700;
                font-size: 14px;
                margin-bottom: 30px;
                box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
              }
              .priority-card {
                background: linear-gradient(135deg, #f97316 0%, #ea580c 50%, #dc2626 100%);
                padding: 35px;
                border-radius: 16px;
                margin-bottom: 25px;
                color: white;
                text-align: center;
                box-shadow: 0 4px 20px rgba(249, 115, 22, 0.3);
              }
              .priority-card h2 {
                font-size: 24px;
                font-weight: 900;
                margin: 0 0 15px 0;
              }
              .priority-card p {
                font-size: 17px;
                line-height: 1.7;
                margin: 0;
                opacity: 0.95;
              }
              .section {
                background: #ffffff;
                padding: 30px;
                border-radius: 16px;
                margin-bottom: 25px;
                border: 2px solid #f3f4f6;
              }
              .section-title {
                font-size: 20px;
                font-weight: 800;
                color: #1a1a1a;
                margin: 0 0 20px 0;
                display: flex;
                align-items: center;
                gap: 10px;
              }
              .section-title::before {
                content: '';
                width: 4px;
                height: 24px;
                background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
                border-radius: 2px;
              }
              .steps-list {
                list-style: none;
                padding: 0;
                margin: 0;
              }
              .steps-list li {
                padding: 18px 0;
                border-bottom: 1px solid #f3f4f6;
                display: flex;
                align-items: flex-start;
                gap: 15px;
                position: relative;
                padding-left: 50px;
              }
              .steps-list li:last-child {
                border-bottom: none;
              }
              .steps-list li::before {
                content: counter(step-counter);
                counter-increment: step-counter;
                position: absolute;
                left: 0;
                top: 18px;
                width: 32px;
                height: 32px;
                background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
                color: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 800;
                font-size: 14px;
                box-shadow: 0 2px 8px rgba(249, 115, 22, 0.3);
              }
              .steps-list {
                counter-reset: step-counter;
              }
              .steps-list li p {
                margin: 0;
                font-size: 16px;
                line-height: 1.6;
                color: #374151;
                font-weight: 500;
              }
              .info-card {
                background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
                padding: 30px;
                border-radius: 16px;
                margin-bottom: 25px;
                border: 2px solid #f59e0b;
              }
              .info-card h3 {
                font-size: 18px;
                font-weight: 800;
                color: #92400e;
                margin: 0 0 12px 0;
              }
              .info-card p {
                font-size: 15px;
                line-height: 1.7;
                color: #78350f;
                margin: 0;
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
              .footer-text a {
                color: #f97316;
                text-decoration: none;
                font-weight: 700;
              }
              .footer-text a:hover {
                text-decoration: underline;
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
                  <h1>🎉 Thank You, ${name}!</h1>
                  <p>You're on the Priority List</p>
                </div>
              </div>
              
              <div class="content">
                <div class="success-badge">
                  ✓ Request Received
                </div>

                <div class="priority-card">
                  <h2>You're on the Priority List! ✓</h2>
                  <p>
                    Thanks ${name}, for your interest in getting a high-converting website for your personal training business. 
                    I'll notify you personally as soon as a spot opens up.
                  </p>
                </div>

                <div class="section">
                  <h2 class="section-title">📋 What Happens Next?</h2>
                  <ol class="steps-list">
                    <li>
                      <p><strong>I'll reach out personally</strong> when capacity opens</p>
                    </li>
                    <li>
                      <p><strong>You'll get priority access</strong> before public availability</p>
                    </li>
                    <li>
                      <p><strong>We can start working</strong> on your site within 1-2 weeks</p>
                    </li>
                  </ol>
                </div>

                <div class="info-card">
                  <h3>💡 Why the wait?</h3>
                  <p>
                    I limit my client load to ensure every website gets the attention, speed, and quality it deserves. 
                    This means your site will be built right – fast, professional, and ready to convert.
                  </p>
                </div>

                <div class="section" style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-color: #3b82f6;">
                  <h2 class="section-title" style="color: #1e40af;">💬 Questions?</h2>
                  <p style="margin: 0; font-size: 16px; color: #1e3a8a; line-height: 1.7; font-weight: 500;">
                    Just reply to this email – I read every message. We're here to help! 🚀
                  </p>
                </div>
              </div>

              <div class="footer">
                <div class="footer-brand">PTBoost</div>
                <p class="footer-text">
                  Professional Websites for Personal Trainers<br>
                  You're receiving this because you signed up for notifications at <a href="https://ptboost.co.uk">ptboost.co.uk</a>
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
      })
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending notification:', error)
    return NextResponse.json(
      { error: 'Failed to send notification' },
      { status: 500 }
    )
  }
}

