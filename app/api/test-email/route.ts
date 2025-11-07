import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function GET(request: Request) {
  try {
    // Send test email
    const { data, error } = await resend.emails.send({
      from: 'PTBoost Test <noreply@ptboost.co.uk>',
      to: ['alexander.ptboost@gmail.com'],
      subject: 'Test Email - PTBoost Booking System',
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
              .success {
                background: #10b981;
                color: white;
                padding: 15px;
                border-radius: 8px;
                text-align: center;
                font-weight: bold;
                margin: 20px 0;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1 style="margin: 0;">🎉 Test Email Successful!</h1>
            </div>
            
            <div class="content">
              <div class="success">
                ✅ Your Resend integration is working perfectly!
              </div>
              
              <p>Hi Alexander,</p>
              
              <p>This is a test email from your PTBoost booking system. If you're seeing this, it means:</p>
              
              <ul>
                <li>✅ Resend API key is configured correctly</li>
                <li>✅ Email sending functionality is working</li>
                <li>✅ HTML email templates are rendering properly</li>
                <li>✅ Your booking notification system is ready to go!</li>
              </ul>
              
              <p><strong>Next steps:</strong></p>
              <ol>
                <li>Set up your Supabase bookings table</li>
                <li>Configure your Stripe payment link success URL</li>
                <li>Test the complete booking flow</li>
              </ol>
              
              <p>When a real customer completes a booking, you'll receive an email just like this one with all their details at <strong>alexander.ptboost@gmail.com</strong>.</p>
              
              <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
              
              <p style="text-align: center; color: #666; font-size: 14px;">
                This is an automated test email from your PT Website Booking System
              </p>
            </div>
          </body>
        </html>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ 
        success: false, 
        error: error.message || 'Failed to send email',
        details: error 
      }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Test email sent successfully!',
      messageId: data?.id,
      recipient: 'alexander.ptboost@gmail.com'
    })
  } catch (error: any) {
    console.error('Error sending test email:', error)
    return NextResponse.json(
      { 
        success: false,
        error: error.message || 'Failed to send test email',
        hint: 'Make sure RESEND_API_KEY is set in your .env.local file'
      },
      { status: 500 }
    )
  }
}

