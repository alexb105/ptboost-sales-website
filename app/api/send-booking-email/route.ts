import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const bookingData = await request.json()

    console.log('Sending booking email for:', bookingData.businessName)
    
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured!')
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 })
    }

    // Send email with booking information
    const { data, error } = await resend.emails.send({
      from: 'PT Website Bookings <onboarding@resend.dev>', // Update this with your verified domain
      to: ['alexander.ptboost@gmail.com'],
      subject: `New Website Booking - ${bookingData.businessName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
                color: white;
                padding: 30px;
                border-radius: 10px 10px 0 0;
                text-align: center;
              }
              .content {
                background: #f9fafb;
                padding: 30px;
                border-radius: 0 0 10px 10px;
              }
              .section {
                background: white;
                padding: 20px;
                margin-bottom: 20px;
                border-radius: 8px;
                border-left: 4px solid #f97316;
              }
              .section h2 {
                margin-top: 0;
                color: #f97316;
                font-size: 18px;
              }
              .field {
                margin-bottom: 15px;
              }
              .field-label {
                font-weight: bold;
                color: #666;
                font-size: 14px;
              }
              .field-value {
                color: #333;
                font-size: 16px;
                margin-top: 4px;
              }
              .footer {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 2px solid #e5e7eb;
                color: #666;
                font-size: 14px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1 style="margin: 0; font-size: 28px;">🎉 New Website Booking!</h1>
              <p style="margin: 10px 0 0 0; font-size: 16px;">A new client has completed their payment</p>
            </div>
            
            <div class="content">
              <div class="section">
                <h2>👤 Personal Information</h2>
                <div class="field">
                  <div class="field-label">Full Name</div>
                  <div class="field-value">${bookingData.fullName}</div>
                </div>
                <div class="field">
                  <div class="field-label">Email</div>
                  <div class="field-value"><a href="mailto:${bookingData.email}">${bookingData.email}</a></div>
                </div>
                <div class="field">
                  <div class="field-label">Phone</div>
                  <div class="field-value"><a href="tel:${bookingData.phone}">${bookingData.phone}</a></div>
                </div>
              </div>

              <div class="section">
                <h2>💼 Business Information</h2>
                <div class="field">
                  <div class="field-label">Business Name</div>
                  <div class="field-value">${bookingData.businessName}</div>
                </div>
                <div class="field">
                  <div class="field-label">Location</div>
                  <div class="field-value">${bookingData.location}</div>
                </div>
                <div class="field">
                  <div class="field-label">Specialization</div>
                  <div class="field-value">${bookingData.specialization}</div>
                </div>
              </div>

              <div class="section">
                <h2>🎨 Website Preferences</h2>
                <div class="field">
                  <div class="field-label">Preferred Colors</div>
                  <div class="field-value">${bookingData.preferredColors}</div>
                </div>
                <div class="field">
                  <div class="field-label">Website Goals</div>
                  <div class="field-value">${bookingData.websiteGoals}</div>
                </div>
                <div class="field">
                  <div class="field-label">Additional Notes</div>
                  <div class="field-value">${bookingData.additionalNotes}</div>
                </div>
              </div>

              <div class="section">
                <h2>💰 Payment Information</h2>
                <div class="field">
                  <div class="field-label">Amount Paid</div>
                  <div class="field-value">£59.00</div>
                </div>
                <div class="field">
                  <div class="field-label">Payment Status</div>
                  <div class="field-value">✅ Completed</div>
                </div>
                <div class="field">
                  <div class="field-label">Session ID</div>
                  <div class="field-value" style="font-size: 12px; font-family: monospace;">${bookingData.sessionId || 'N/A'}</div>
                </div>
              </div>

              <div class="footer">
                <p style="margin: 0;">This is an automated notification from your PT Website Booking System</p>
                <p style="margin: 5px 0 0 0; font-size: 12px;">Respond to the customer at ${bookingData.email} to begin their project</p>
              </div>
            </div>
          </body>
        </html>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    return NextResponse.json({ success: true, messageId: data?.id })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}

