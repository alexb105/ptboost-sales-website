// API endpoint for account deletion requests
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Use service role key for admin operations
const supabaseAdmin = process.env.SUPABASE_SERVICE_ROLE_KEY
  ? createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )
  : createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

export async function POST(request: Request) {
  try {
    const { email, name, businessName, reason, notes } = await request.json()

    if (!email || !name) {
      return NextResponse.json(
        { error: 'Email and name are required' },
        { status: 400 }
      )
    }

    // Verify user exists
    const { data: booking, error: fetchError } = await supabaseAdmin
      .from('bookings')
      .select('id, email, full_name, business_name, stripe_customer_id, subscription_password')
      .eq('email', email)
      .eq('payment_status', 'completed')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (fetchError || !booking) {
      return NextResponse.json(
        { error: 'Account not found' },
        { status: 404 }
      )
    }

    // Send confirmation email to customer
    if (process.env.RESEND_API_KEY) {
      try {
        console.log(`Sending account deletion request confirmation to customer: ${email}`)
        await resend.emails.send({
          from: 'PTBoost <noreply@ptboost.co.uk>',
          to: [email],
          subject: 'Account Deletion Request Received - PTBoost',
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
                    background: linear-gradient(135deg, #fef3e7 0%, #fff5e6 100%);
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
                      <h1>Request Received</h1>
                      <p>Your account deletion request has been received</p>
                    </div>
                  </div>
                  
                  <div class="content">
                    <div class="info-badge">
                      📋 Request Confirmed
                    </div>

                    <div class="message-card">
                      <p>
                        <strong>Dear ${name},</strong>
                      </p>
                      <p>
                        Your request to delete your PTBoost account has been received and will be processed within <strong>2 business days (Monday to Friday)</strong>.
                      </p>
                    </div>

                    <div class="section">
                      <h2 class="section-title">What Happens Next</h2>
                      <ul class="info-list">
                        <li>
                          <p>Your account deletion request will be reviewed by our team</p>
                        </li>
                        <li>
                          <p>We will process the deletion within 2 business days (Monday to Friday)</p>
                        </li>
                        <li>
                          <p>You will receive a confirmation email once your account has been deleted</p>
                        </li>
                        <li>
                          <p>All website files, data, and your subscription will be permanently removed</p>
                        </li>
                      </ul>
                    </div>

                    <div class="section">
                      <h2 class="section-title">Important Information</h2>
                      <ul class="info-list">
                        <li>
                          <p>This action is <strong>irreversible</strong> - once your account is deleted, we cannot recover your website or data</p>
                        </li>
                        <li>
                          <p>If you change your mind, please contact us at <a href="mailto:alexander.ptboost@gmail.com" style="color: #f97316; font-weight: 700;">alexander.ptboost@gmail.com</a> as soon as possible</p>
                        </li>
                        <li>
                          <p>If you did not request this deletion, please contact us immediately</p>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div class="footer">
                    <div class="footer-brand">PTBoost</div>
                    <p class="footer-text">
                      Thank you for being a part of PTBoost.
                      <br /><br />
                      If you have any questions or concerns, please contact us at <a href="mailto:alexander.ptboost@gmail.com" style="color: #f97316; text-decoration: none; font-weight: 700;">alexander.ptboost@gmail.com</a>
                    </p>
                  </div>
                </div>
              </body>
            </html>
          `,
        })
        console.log(`Customer notification email sent successfully to: ${email}`)
      } catch (emailError) {
        console.error('Error sending customer notification email:', emailError)
        // Continue to send admin notification even if customer email fails
      }

      // Send notification email to admin
      try {
        console.log('Sending account deletion request notification to admin')
        await resend.emails.send({
          from: 'PTBoost <noreply@ptboost.co.uk>',
          to: ['alexander.ptboost@gmail.com'],
          subject: '🚨 Account Deletion Request',
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
                    background: #f5f5f5;
                    padding: 20px;
                  }
                  .email-container {
                    max-width: 650px;
                    margin: 0 auto;
                    background: #ffffff;
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
                  }
                  .header {
                    background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
                    color: white;
                    padding: 40px;
                    text-align: center;
                  }
                  .header h1 {
                    font-size: 32px;
                    font-weight: 900;
                    margin: 0 0 10px 0;
                  }
                  .header p {
                    font-size: 18px;
                    margin: 0;
                    opacity: 0.95;
                  }
                  .content {
                    padding: 40px;
                  }
                  .alert-box {
                    background: #fee2e2;
                    border: 2px solid #dc2626;
                    border-radius: 12px;
                    padding: 20px;
                    margin-bottom: 30px;
                  }
                  .alert-box p {
                    font-size: 18px;
                    font-weight: 700;
                    color: #dc2626;
                    margin: 0;
                  }
                  .info-section {
                    background: #f9fafb;
                    border-radius: 12px;
                    padding: 25px;
                    margin-bottom: 25px;
                  }
                  .info-section h2 {
                    font-size: 20px;
                    font-weight: 800;
                    color: #1a1a1a;
                    margin: 0 0 15px 0;
                  }
                  .info-row {
                    display: flex;
                    padding: 12px 0;
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
                    font-weight: 500;
                  }
                  .action-required {
                    background: #fff7ed;
                    border: 2px solid #f97316;
                    border-radius: 12px;
                    padding: 25px;
                    margin-top: 30px;
                  }
                  .action-required h3 {
                    font-size: 18px;
                    font-weight: 800;
                    color: #f97316;
                    margin: 0 0 15px 0;
                  }
                  .action-required ul {
                    margin: 0;
                    padding-left: 20px;
                  }
                  .action-required li {
                    color: #1a1a1a;
                    margin-bottom: 8px;
                    font-weight: 500;
                  }
                  .footer {
                    background: #1a1a1a;
                    color: white;
                    padding: 30px;
                    text-align: center;
                  }
                  .footer p {
                    font-size: 14px;
                    color: #d1d5db;
                    margin: 0;
                  }
                </style>
              </head>
              <body>
                <div class="email-container">
                  <div class="header">
                    <h1>🚨 Account Deletion Request</h1>
                    <p>A customer has requested account deletion</p>
                  </div>
                  
                  <div class="content">
                    <div class="alert-box">
                      <p>⚠️ ACTION REQUIRED: Process account deletion within 2 business days</p>
                    </div>

                    <div class="info-section">
                      <h2>Customer Information</h2>
                      <div class="info-row">
                        <span class="info-label">Name:</span>
                        <span class="info-value">${name}</span>
                      </div>
                      <div class="info-row">
                        <span class="info-label">Email:</span>
                        <span class="info-value">${email}</span>
                      </div>
                      <div class="info-row">
                        <span class="info-label">Business Name:</span>
                        <span class="info-value">${businessName || 'N/A'}</span>
                      </div>
                      <div class="info-row">
                        <span class="info-label">Stripe Customer ID:</span>
                        <span class="info-value">${booking.stripe_customer_id || 'N/A'}</span>
                      </div>
                    </div>

                    <div class="info-section">
                      <h2>Deletion Request Details</h2>
                      <div class="info-row">
                        <span class="info-label">Reason:</span>
                        <span class="info-value">${reason || 'Not provided'}</span>
                      </div>
                      ${notes ? `
                      <div class="info-row">
                        <span class="info-label">Additional Notes:</span>
                        <span class="info-value">${notes}</span>
                      </div>
                      ` : ''}
                    </div>

                    <div class="action-required">
                      <h3>📋 Action Required</h3>
                      <ul>
                        <li>Process this deletion request within 2 business days (Monday to Friday)</li>
                        <li>Cancel the Stripe subscription for this customer</li>
                        <li>Delete all website files and data associated with this account</li>
                        <li>Delete the customer's Stripe record</li>
                        <li>Send final confirmation email to the customer once completed</li>
                      </ul>
                    </div>
                  </div>

                  <div class="footer">
                    <p>PTBoost Admin Notification System</p>
                  </div>
                </div>
              </body>
            </html>
          `,
        })
        console.log('Admin notification email sent successfully')
      } catch (adminEmailError) {
        console.error('Error sending admin notification email:', adminEmailError)
      }
    }

    return NextResponse.json({ 
      success: true,
      message: 'Account deletion request submitted successfully. You will receive confirmation within 2 business days.'
    })
  } catch (error) {
    console.error('Error in delete-account-request:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

