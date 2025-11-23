import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getEmailOptions } from '@/lib/email-helpers'

const resend = new Resend(process.env.RESEND_API_KEY)

/**
 * Test email endpoint for Mail-Tester.com
 * Send a GET request to /api/test-email to test email deliverability
 */
export async function GET(request: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'RESEND_API_KEY not configured' },
        { status: 500 }
      )
    }

    // Mail-Tester address from query params or use default
    const { searchParams } = new URL(request.url)
    const testEmail = searchParams.get('email') || 'test-tr59w0yn0@srv1.mail-tester.com'

    console.log(`📧 Sending test email to: ${testEmail}`)

    // Send test email using our email helpers
    const result = await resend.emails.send(
      getEmailOptions({
        from: 'PTBoost <noreply@ptboost.co.uk>',
        to: [testEmail],
        subject: 'PTBoost Email Deliverability Test',
        replyTo: 'ptboost.info@gmail.com',
        unsubscribeUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://ptboost.co.uk'}/account?action=unsubscribe`,
        tags: [{ name: 'email_type', value: 'deliverability_test' }],
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
                }
                .header h1 {
                  font-size: 36px;
                  font-weight: 900;
                  margin: 0 0 15px 0;
                }
                .content {
                  padding: 40px;
                  background: #ffffff;
                }
                .test-badge {
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
                }
                .check-list {
                  list-style: none;
                  padding: 0;
                  margin: 0;
                }
                .check-list li {
                  padding: 15px 0;
                  border-bottom: 1px solid #f3f4f6;
                  display: flex;
                  align-items: flex-start;
                  gap: 12px;
                }
                .check-list li:last-child {
                  border-bottom: none;
                }
                .check-list li::before {
                  content: '✓';
                  color: #10b981;
                  font-size: 20px;
                  font-weight: 700;
                  line-height: 1;
                }
                .check-list li p {
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
              </style>
            </head>
            <body>
              <div class="email-container">
                <div class="header">
                  <h1>Email Deliverability Test</h1>
                  <p>PTBoost Email System</p>
                </div>
                
                <div class="content">
                  <div class="test-badge">
                    ✓ Test Email
                  </div>

                  <div class="section">
                    <h2 class="section-title">What This Email Tests</h2>
                    <ul class="check-list">
                      <li>
                        <p><strong>SPF, DKIM, DMARC Authentication</strong> - Domain authentication records</p>
                      </li>
                      <li>
                        <p><strong>List-Unsubscribe Headers</strong> - Proper unsubscribe mechanism</p>
                      </li>
                      <li>
                        <p><strong>Email Headers</strong> - Reply-To, Precedence, and other headers</p>
                      </li>
                      <li>
                        <p><strong>Content Analysis</strong> - Spam trigger words and formatting</p>
                      </li>
                      <li>
                        <p><strong>Blacklist Status</strong> - Domain and IP reputation</p>
                      </li>
                    </ul>
                  </div>

                  <div class="section" style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-color: #3b82f6;">
                    <h2 class="section-title" style="color: #1e40af;">Expected Results</h2>
                    <p style="margin: 0; font-size: 16px; color: #1e3a8a; line-height: 1.7; font-weight: 500;">
                      After implementing the email deliverability fixes, you should see:
                      <br /><br />
                      ✅ <strong>Score: 10/10</strong> (or at least 8-9/10)
                      <br />
                      ✅ <strong>SPF, DKIM, DMARC: PASS</strong>
                      <br />
                      ✅ <strong>Blacklist: Not blacklisted</strong>
                      <br />
                      ✅ <strong>List-Unsubscribe: Present</strong>
                    </p>
                  </div>
                </div>

                <div class="footer">
                  <div class="footer-brand">PTBoost</div>
                  <p class="footer-text">
                    Professional PT Websites<br>
                    This is a test email sent from the PTBoost email system.
                    <br /><br />
                    If you received this email, the basic sending functionality is working!
                  </p>
                </div>
              </div>
            </body>
          </html>
        `,
      })
    )

    if (result.error) {
      console.error('❌ Failed to send test email:', result.error)
      return NextResponse.json(
        { 
          error: 'Failed to send test email',
          details: result.error 
        },
        { status: 500 }
      )
    }

    console.log('✅ Test email sent successfully!')
    console.log('Email ID:', result.data?.id)

    return NextResponse.json({
      success: true,
      message: 'Test email sent successfully!',
      emailId: result.data?.id,
      recipient: testEmail,
      instructions: 'Go back to mail-tester.com and click "Then check your score" to see the results'
    })

  } catch (error) {
    console.error('❌ Error sending test email:', error)
    return NextResponse.json(
      { 
        error: 'Failed to send test email',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

