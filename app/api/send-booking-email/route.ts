import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { renderEmailTemplate } from '@/lib/email-templates'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const bookingData = await request.json()

    console.log('Sending order email for:', bookingData.businessName)
    console.log('Customer email:', bookingData.email)
    
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured!')
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 })
    }

    // Send confirmation email to customer
    console.log('Attempting to send customer confirmation email...')
    
    // Try to get template from database, fallback to hardcoded if not found
    const customerTemplate = await renderEmailTemplate('customer_booking_confirmation', {
      fullName: bookingData.fullName,
      email: bookingData.email,
      businessName: bookingData.businessName,
      location: bookingData.location,
      specialization: bookingData.specialization,
      preferredColors: bookingData.preferredColors || '',
      websiteGoals: bookingData.websiteGoals || '',
      additionalNotes: bookingData.additionalNotes || '',
      subscriptionPassword: bookingData.subscriptionPassword || '',
      sessionId: bookingData.sessionId || ''
    })

    const customerSubject = customerTemplate?.subject || '🎉 Your Website Order is Confirmed!'
    const customerHtml = customerTemplate?.html || `
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
                margin: 0;
                font-weight: 500;
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
              .password-card {
                background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
                padding: 35px;
                border-radius: 16px;
                margin-bottom: 25px;
                border: 2px solid #f59e0b;
                text-align: center;
                box-shadow: 0 4px 20px rgba(245, 158, 11, 0.15);
              }
              .password-card h3 {
                font-size: 22px;
                font-weight: 800;
                color: #92400e;
                margin: 0 0 15px 0;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
              }
              .password-display {
                background: white;
                padding: 25px;
                border-radius: 12px;
                margin: 20px 0;
                border: 3px solid #f59e0b;
                box-shadow: 0 4px 12px rgba(245, 158, 11, 0.2);
              }
              .password-display code {
                font-size: 36px;
                font-weight: 900;
                font-family: 'Courier New', monospace;
                letter-spacing: 4px;
                color: #f59e0b;
                display: block;
              }
              .password-note {
                font-size: 14px;
                color: #78350f;
                margin: 15px 0 0 0;
                font-weight: 600;
              }
              .button {
                display: inline-block;
                background: linear-gradient(135deg, #f97316 0%, #ea580c 50%, #dc2626 100%);
                color: white;
                padding: 16px 32px;
                text-decoration: none;
                border-radius: 12px;
                font-weight: 800;
                font-size: 16px;
                margin-top: 20px;
                box-shadow: 0 4px 15px rgba(249, 115, 22, 0.4);
                transition: transform 0.2s;
                text-align: center;
              }
              .button:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(249, 115, 22, 0.5);
              }
              .details-grid {
                display: grid;
                gap: 15px;
                margin-top: 20px;
              }
              .detail-item {
                padding: 15px;
                background: #f9fafb;
                border-radius: 12px;
                border-left: 4px solid #f97316;
              }
              .detail-label {
                font-size: 12px;
                font-weight: 700;
                color: #6b7280;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 5px;
              }
              .detail-value {
                font-size: 16px;
                font-weight: 600;
                color: #1a1a1a;
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
                .password-display code {
                  font-size: 28px;
                  letter-spacing: 2px;
                }
              }
            </style>
          </head>
          <body>
            <div class="email-container">
              <div class="header">
                <div class="header-content">
                  <h1>✨ Thank You, ${bookingData.fullName}!</h1>
                  <p>Your Website Order is Confirmed</p>
                </div>
              </div>
              
              <div class="content">
                <div class="success-badge">
                  ✓ Payment Successful
                </div>

                <div class="message-card">
                  <p>
                    🎉 <strong>I'm thrilled to have you on board!</strong> Your payment has been processed successfully, 
                    and I've received all your details. I'm excited to start building your professional website that will 
                    attract clients 24/7.
                  </p>
                </div>

                <div class="section">
                  <h2 class="section-title">📋 What Happens Next?</h2>
                  <ol class="steps-list">
                    <li>
                      <p><strong>Within 24 hours:</strong> I will review your requirements and preferences. I'll be in touch if any additional information is required.</p>
                    </li>
                    <li>
                      <p><strong>Within 2 days:</strong> You can expect your first website demo!</p>
                    </li>
                    <li>
                      <p><strong>Launch ready:</strong> Your custom website will be live and attracting clients within 7 days!</p>
                    </li>
                  </ol>
                </div>

                <div class="password-card">
                  <h3>🔐 Your Subscription Password</h3>
                  <p style="margin: 0 0 20px 0; color: #78350f; font-size: 15px; font-weight: 600;">
                    Save this password! You'll need it along with your email to manage your subscription.
                  </p>
                  <div class="password-display">
                    <code>${bookingData.subscriptionPassword || 'N/A'}</code>
                  </div>
                  <p class="password-note">
                    💡 Use this password to cancel, update payment methods, or view invoices
                  </p>
                  <a style='color: white;' href="${(process.env.NEXT_PUBLIC_SITE_URL || 'https://ptboost.co.uk').replace(/\/$/, '')}/account" class="button">
                    Manage Your Account →
                  </a>
                </div>

                <div class="section">
                  <h2 class="section-title">📝 Your Order Details</h2>
                  <div class="details-grid">
                    <div class="detail-item">
                      <div class="detail-label">Business Name</div>
                      <div class="detail-value">${bookingData.businessName}</div>
                    </div>
                    <div class="detail-item">
                      <div class="detail-label">Location</div>
                      <div class="detail-value">${bookingData.location}</div>
                    </div>
                    <div class="detail-item">
                      <div class="detail-label">Specialization</div>
                      <div class="detail-value">${bookingData.specialization}</div>
                    </div>
                    ${bookingData.preferredColors ? `
                    <div class="detail-item">
                      <div class="detail-label">Preferred Colors</div>
                      <div class="detail-value">${bookingData.preferredColors}</div>
                    </div>
                    ` : ''}
                  </div>
                </div>

                <div class="section" style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-color: #3b82f6;">
                  <h2 class="section-title" style="color: #1e40af;">💬 Need to Get in Touch?</h2>
                  <p style="margin: 0; font-size: 16px; color: #1e3a8a; line-height: 1.7; font-weight: 500;">
                    If you have any questions or need to update your information, feel free to send your request to ptboost.info@gmail.com. 
                    We're here to help make your website perfect! 🚀
                  </p>
                </div>
              </div>

              <div class="footer">
                <div class="footer-brand">PTBoost</div>
                <p class="footer-text">
                  Professional PT Websites<br>
                  Thank you for choosing us to build your online presence!
                </p>
              </div>
            </div>
          </body>
        </html>
      `
    
    const customerEmail = await resend.emails.send({
      from: 'PTBoost <noreply@ptboost.co.uk>',
      to: [bookingData.email],
      subject: customerSubject,
      html: customerHtml,
    })

    if (customerEmail.error) {
      console.error('❌ FAILED to send customer confirmation email!')
      console.error('Customer email error:', JSON.stringify(customerEmail.error, null, 2))
      console.error('Attempted to send to:', bookingData.email)
    } else {
      console.log('✅ Customer confirmation email sent successfully!')
      console.log('Customer email ID:', customerEmail.data?.id)
    }

    // Send notification email to admin
    console.log('Sending admin notification email...')
    
    // Try to get template from database, fallback to hardcoded if not found
    const developerTemplate = await renderEmailTemplate('developer_new_booking', {
      fullName: bookingData.fullName,
      email: bookingData.email,
      phone: bookingData.phone || '',
      businessName: bookingData.businessName,
      location: bookingData.location,
      specialization: bookingData.specialization,
      preferredColors: bookingData.preferredColors || '',
      websiteGoals: bookingData.websiteGoals || '',
      additionalNotes: bookingData.additionalNotes || '',
      sessionId: bookingData.sessionId || ''
    })

    const developerSubject = developerTemplate?.subject || `New Website Order - ${bookingData.businessName}`
    const developerHtml = developerTemplate?.html || `
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
              .details-grid {
                display: grid;
                gap: 15px;
                margin-top: 20px;
              }
              .detail-item {
                padding: 18px;
                background: #f9fafb;
                border-radius: 12px;
                border-left: 4px solid #f97316;
                transition: all 0.2s;
              }
              .detail-item:hover {
                background: #f3f4f6;
                transform: translateX(2px);
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
                color: #f97316;
                text-decoration: none;
                font-weight: 700;
              }
              .detail-value a:hover {
                text-decoration: underline;
              }
              .payment-badge {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                color: white;
                padding: 8px 16px;
                border-radius: 50px;
                font-weight: 700;
                font-size: 14px;
                box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
              }
              .session-id {
                font-family: 'Courier New', monospace;
                font-size: 12px;
                color: #6b7280;
                background: #f3f4f6;
                padding: 8px 12px;
                border-radius: 8px;
                word-break: break-all;
                margin-top: 8px;
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
                  <h1>🎉 New Website Order!</h1>
                  <p>A new client has completed their payment</p>
                </div>
              </div>
              
              <div class="content">
                <div class="alert-badge">
                  ⚡ Action Required
                </div>

                <div class="section">
                  <h2 class="section-title">👤 Personal Information</h2>
                  <div class="details-grid">
                    <div class="detail-item">
                      <div class="detail-label">Full Name</div>
                      <div class="detail-value">${bookingData.fullName}</div>
                    </div>
                    <div class="detail-item">
                      <div class="detail-label">Email</div>
                      <div class="detail-value"><a href="mailto:${bookingData.email}">${bookingData.email}</a></div>
                    </div>
                    <div class="detail-item">
                      <div class="detail-label">Phone</div>
                      <div class="detail-value"><a href="tel:${bookingData.phone}">${bookingData.phone}</a></div>
                    </div>
                  </div>
                </div>

                <div class="section">
                  <h2 class="section-title">💼 Business Information</h2>
                  <div class="details-grid">
                    <div class="detail-item">
                      <div class="detail-label">Business Name</div>
                      <div class="detail-value">${bookingData.businessName}</div>
                    </div>
                    <div class="detail-item">
                      <div class="detail-label">Location</div>
                      <div class="detail-value">${bookingData.location}</div>
                    </div>
                    <div class="detail-item">
                      <div class="detail-label">Specialization</div>
                      <div class="detail-value">${bookingData.specialization}</div>
                    </div>
                  </div>
                </div>

                <div class="section">
                  <h2 class="section-title">🎨 Website Preferences</h2>
                  <div class="details-grid">
                    ${bookingData.preferredColors ? `
                    <div class="detail-item">
                      <div class="detail-label">Preferred Colors</div>
                      <div class="detail-value">${bookingData.preferredColors || 'Not specified'}</div>
                    </div>
                    ` : ''}
                    ${bookingData.websiteGoals ? `
                    <div class="detail-item">
                      <div class="detail-label">Website Goals</div>
                      <div class="detail-value">${bookingData.websiteGoals || 'Not specified'}</div>
                    </div>
                    ` : ''}
                    ${bookingData.additionalNotes ? `
                    <div class="detail-item">
                      <div class="detail-label">Additional Notes</div>
                      <div class="detail-value">${bookingData.additionalNotes || 'None'}</div>
                    </div>
                    ` : ''}
                    ${!bookingData.preferredColors && !bookingData.websiteGoals && !bookingData.additionalNotes ? `
                    <div class="detail-item">
                      <div class="detail-value" style="color: #6b7280; font-style: italic;">No preferences specified</div>
                    </div>
                    ` : ''}
                  </div>
                </div>

                <div class="section" style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-color: #10b981;">
                  <h2 class="section-title" style="color: #059669;">💰 Payment Information</h2>
                  <div class="details-grid">
                    <div class="detail-item" style="background: white; border-color: #10b981;">
                      <div class="detail-label">Payment Status</div>
                      <div class="detail-value">
                        <span class="payment-badge">✅ Completed</span>
                      </div>
                    </div>
                    ${bookingData.sessionId ? `
                    <div class="detail-item" style="background: white; border-color: #10b981;">
                      <div class="detail-label">Session ID</div>
                      <div class="detail-value">
                        <div class="session-id">${bookingData.sessionId}</div>
                      </div>
                    </div>
                    ` : ''}
                  </div>
                </div>
              </div>

              <div class="footer">
                <div class="footer-brand">PTBoost</div>
                <p class="footer-text">
                  This is an automated notification from your PT Website Order System<br>
                  <strong>Next Step:</strong> Contact the customer at <a href="mailto:${bookingData.email}">${bookingData.email}</a> to begin their project
                </p>
              </div>
            </div>
          </body>
        </html>
      `
    
    const { data, error } = await resend.emails.send({
      from: 'PT Website Orders <noreply@ptboost.co.uk>',
      to: ['ptboost.info@gmail.com'],
      subject: developerSubject,
      html: developerHtml,
    })

    if (error) {
      console.error('❌ FAILED to send admin notification email!')
      console.error('Admin email error:', JSON.stringify(error, null, 2))
      return NextResponse.json({ error: 'Failed to send admin notification email' }, { status: 500 })
    }

    console.log('✅ Admin notification email sent successfully!')
    console.log('Admin email ID:', data?.id)
    console.log('\n📊 Email Summary:')
    console.log('- Customer Email ID:', customerEmail.data?.id || 'FAILED')
    console.log('- Admin Email ID:', data?.id)
    
    return NextResponse.json({ 
      success: true, 
      customerEmailId: customerEmail.data?.id,
      adminEmailId: data?.id 
    })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}

