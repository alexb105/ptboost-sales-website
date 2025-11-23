import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getEmailOptions } from '@/lib/email-helpers'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { email, name, businessName, reason, notes } = await request.json()

    if (!email || !name) {
      return NextResponse.json(
        { error: 'Email and name are required' },
        { status: 400 }
      )
    }

    // Send confirmation email to customer
    if (process.env.RESEND_API_KEY) {
      try {
        console.log(`Sending account deletion request confirmation to: ${email}`)
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ptboost.co.uk'
        await resend.emails.send(
          getEmailOptions({
            from: 'PTBoost <noreply@ptboost.co.uk>',
            to: [email],
            subject: 'Account Deletion Request Received - PTBoost',
            replyTo: 'ptboost.info@gmail.com',
            tags: [{ name: 'email_type', value: 'account_deletion_request' }],
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
                  .info-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
                    color: white;
                    padding: 12px 24px;
                    border-radius: 50px;
                    font-weight: 700;
                    font-size: 14px;
                    margin-bottom: 30px;
                    box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
                  }
                  .message-card {
                    background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
                    padding: 30px;
                    border-radius: 16px;
                    margin-bottom: 25px;
                    border: 2px solid rgba(249, 115, 22, 0.2);
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
                  .info-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                  }
                  .info-list li {
                    padding: 15px 0;
                    border-bottom: 1px solid #f3f4f6;
                    display: flex;
                    align-items: flex-start;
                    gap: 15px;
                  }
                  .info-list li:last-child {
                    border-bottom: none;
                  }
                  .info-list li::before {
                    content: '•';
                    color: #f97316;
                    font-size: 24px;
                    line-height: 1;
                    margin-top: -2px;
                  }
                  .info-list li p {
                    margin: 0;
                    font-size: 16px;
                    line-height: 1.6;
                    color: #374151;
                    font-weight: 500;
                  }
                  .highlight-box {
                    background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
                    padding: 25px;
                    border-radius: 12px;
                    border: 2px solid rgba(59, 130, 246, 0.2);
                    margin-top: 20px;
                  }
                  .highlight-box p {
                    font-size: 16px;
                    color: #1e40af;
                    margin: 0;
                    font-weight: 600;
                    line-height: 1.6;
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
                      <h1>Deletion Request Received</h1>
                      <p>We've received your account deletion request</p>
                    </div>
                  </div>
                  
                  <div class="content">
                    <div class="info-badge">
                      📋 Request Submitted
                    </div>

                    <div class="message-card">
                      <p>
                        <strong>Dear ${name},</strong>
                      </p>
                      <p>
                        Your request to delete your account has been received and will be processed shortly.
                      </p>
                      <p>
                        We will process your deletion request within <strong>2 business days (Monday to Friday)</strong>.
                      </p>
                    </div>

                    <div class="section">
                      <h2 class="section-title">What Happens Next</h2>
                      <ul class="info-list">
                        <li>
                          <p>Our team will review your deletion request within 2 business days</p>
                        </li>
                        <li>
                          <p>You'll receive a final confirmation email once the deletion is complete</p>
                        </li>
                        <li>
                          <p>Your subscription will be cancelled, and your website will be taken offline</p>
                        </li>
                        <li>
                          <p>All your data and website files will be permanently deleted</p>
                        </li>
                      </ul>
                    </div>

                    <div class="section">
                      <h2 class="section-title">Changed Your Mind?</h2>
                      <ul class="info-list">
                        <li>
                          <p>If you'd like to cancel this deletion request, please contact us immediately at <a href="mailto:alexander.ptboost@gmail.com" style="color: #f97316; font-weight: 700; text-decoration: none;">alexander.ptboost@gmail.com</a></p>
                        </li>
                        <li>
                          <p>Once the deletion is processed, it cannot be undone</p>
                        </li>
                      </ul>
                    </div>

                    <div class="highlight-box">
                      <p>
                        ⚠️ <strong>Important:</strong> This is a confirmation that we received your request. Your account has NOT been deleted yet. You'll receive another email once the deletion is complete.
                      </p>
                    </div>
                  </div>

                  <div class="footer">
                    <div class="footer-brand">PTBoost</div>
                    <p class="footer-text">
                      We're sorry to see you go. If you have any questions, please contact us at <a href="mailto:alexander.ptboost@gmail.com" style="color: #f97316; text-decoration: none; font-weight: 700;">alexander.ptboost@gmail.com</a>
                    </p>
                  </div>
                </div>
              </body>
            </html>
          `,
          })
        )
        console.log(`Account deletion request confirmation sent to customer: ${email}`)
      } catch (emailError) {
        console.error('Error sending customer confirmation email:', emailError)
      }

      // Send notification email to admin
      try {
        console.log('Sending account deletion request notification to admin')
        await resend.emails.send(
          getEmailOptions({
            from: 'PTBoost <noreply@ptboost.co.uk>',
            to: ['alexander.ptboost@gmail.com'],
            subject: `Account Deletion Request - ${name} (${email})`,
            replyTo: 'ptboost.info@gmail.com',
            tags: [{ name: 'email_type', value: 'admin_deletion_request' }],
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
                    background: #f3f4f6;
                    padding: 20px;
                  }
                  .email-container {
                    max-width: 650px;
                    margin: 0 auto;
                    background: #ffffff;
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                  }
                  .header {
                    background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
                    color: white;
                    padding: 40px;
                    text-align: center;
                  }
                  .header h1 {
                    font-size: 28px;
                    font-weight: 900;
                    margin: 0 0 10px 0;
                  }
                  .header p {
                    font-size: 16px;
                    margin: 0;
                    opacity: 0.95;
                  }
                  .content {
                    padding: 40px;
                  }
                  .alert-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: #dc2626;
                    color: white;
                    padding: 10px 20px;
                    border-radius: 50px;
                    font-weight: 700;
                    font-size: 14px;
                    margin-bottom: 25px;
                  }
                  .info-section {
                    background: #f9fafb;
                    padding: 25px;
                    border-radius: 12px;
                    margin-bottom: 20px;
                    border-left: 4px solid #dc2626;
                  }
                  .info-section h3 {
                    font-size: 18px;
                    font-weight: 800;
                    color: #1a1a1a;
                    margin: 0 0 15px 0;
                  }
                  .info-row {
                    display: flex;
                    padding: 10px 0;
                    border-bottom: 1px solid #e5e7eb;
                  }
                  .info-row:last-child {
                    border-bottom: none;
                  }
                  .info-label {
                    font-weight: 700;
                    color: #6b7280;
                    min-width: 150px;
                  }
                  .info-value {
                    color: #1a1a1a;
                    font-weight: 600;
                  }
                  .action-box {
                    background: #fef2f2;
                    border: 2px solid #fecaca;
                    padding: 25px;
                    border-radius: 12px;
                    margin-top: 25px;
                  }
                  .action-box h3 {
                    font-size: 18px;
                    font-weight: 800;
                    color: #dc2626;
                    margin: 0 0 15px 0;
                  }
                  .action-box p {
                    font-size: 15px;
                    color: #991b1b;
                    margin: 0;
                    line-height: 1.6;
                  }
                  .footer {
                    background: #1a1a1a;
                    color: #d1d5db;
                    padding: 30px;
                    text-align: center;
                    font-size: 14px;
                  }
                </style>
              </head>
              <body>
                <div class="email-container">
                  <div class="header">
                    <h1>🚨 Account Deletion Request</h1>
                    <p>Action Required - Customer wants to delete their account</p>
                  </div>
                  
                  <div class="content">
                    <div class="alert-badge">
                      ⚠️ Action Required
                    </div>

                    <div class="info-section">
                      <h3>Customer Details</h3>
                      <div class="info-row">
                        <div class="info-label">Name:</div>
                        <div class="info-value">${name}</div>
                      </div>
                      <div class="info-row">
                        <div class="info-label">Email:</div>
                        <div class="info-value">${email}</div>
                      </div>
                      ${businessName ? `
                      <div class="info-row">
                        <div class="info-label">Business:</div>
                        <div class="info-value">${businessName}</div>
                      </div>
                      ` : ''}
                      <div class="info-row">
                        <div class="info-label">Request Date:</div>
                        <div class="info-value">${new Date().toLocaleString('en-GB', { 
                          dateStyle: 'full', 
                          timeStyle: 'short',
                          timeZone: 'Europe/London'
                        })}</div>
                      </div>
                    </div>

                    ${reason ? `
                    <div class="info-section">
                      <h3>Deletion Reason</h3>
                      <div class="info-row">
                        <div class="info-value">${reason}</div>
                      </div>
                    </div>
                    ` : ''}

                    ${notes ? `
                    <div class="info-section">
                      <h3>Additional Notes</h3>
                      <div class="info-row">
                        <div class="info-value">${notes}</div>
                      </div>
                    </div>
                    ` : ''}

                    <div class="action-box">
                      <h3>⏰ Action Required</h3>
                      <p>
                        <strong>Process this deletion request within 2 business days (Monday to Friday).</strong>
                      </p>
                      <p style="margin-top: 15px;">
                        The customer has been notified that their account will be deleted within 2 business days.
                      </p>
                      <p style="margin-top: 15px;">
                        <strong>Steps to complete:</strong><br>
                        1. Cancel their Stripe subscription<br>
                        2. Delete their website files<br>
                        3. Delete their account from the database<br>
                        4. Send final confirmation email to customer
                      </p>
                    </div>
                  </div>

                  <div class="footer">
                    <strong>PTBoost Admin Notification</strong><br>
                    This is an automated notification. Please process this request promptly.
                  </div>
                </div>
              </body>
            </html>
          `,
          })
        )
        console.log('Account deletion request notification sent to admin')
      } catch (emailError) {
        console.error('Error sending admin notification email:', emailError)
      }
    }

    return NextResponse.json({ 
      success: true,
      message: 'Account deletion request submitted successfully'
    })
  } catch (error) {
    console.error('Error in account-deletion-request:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

