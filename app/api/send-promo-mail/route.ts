import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { email, name, promoCode, percentageOff, months } = await request.json()

    if (!email || !name || !promoCode || percentageOff === undefined || !months) {
      return NextResponse.json(
        { error: 'Email, name, promo code, percentage off, and months are required' },
        { status: 400 }
      )
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured!')
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    // Calculate discounted price (assuming base price is £7.99/month)
    const basePrice = 7.99
    const discountAmount = (basePrice * percentageOff) / 100
    const discountedPrice = basePrice - discountAmount

    // Website CTA link
    const websiteLink = "https://ptboost.co.uk/account"
    
    // Format months text
    const monthsText = months === 1 ? 'month' : 'months'

    console.log(`Sending promo mail to ${email} with code ${promoCode}, ${percentageOff}% off for ${months} months`)

    const emailResult = await resend.emails.send({
      from: 'PTBoost <noreply@ptboost.co.uk>',
      to: [email],
      subject: `🎁 Special Offer Just For You - ${percentageOff}% Off!`,
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
                color: #1f2937;
                background: #f3f4f6;
                padding: 0;
                margin: 0;
              }
              .email-wrapper {
                max-width: 600px;
                margin: 0 auto;
                background: #f3f4f6;
                padding: 20px;
              }
              .email-container {
                background: white;
                border-radius: 16px;
                overflow: hidden;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
              }
              .header {
                background: linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%);
                color: white;
                padding: 50px 30px;
                text-align: center;
                position: relative;
                overflow: hidden;
              }
              .header::before {
                content: '';
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
                background-size: 30px 30px;
              }
              .header-content {
                position: relative;
                z-index: 1;
              }
              .header h1 {
                margin: 0 0 10px 0;
                font-size: 32px;
                font-weight: 800;
                text-shadow: 0 2px 10px rgba(0,0,0,0.2);
              }
              .header-badge {
                display: inline-block;
                background: rgba(255, 255, 255, 0.2);
                backdrop-filter: blur(10px);
                border: 2px solid rgba(255, 255, 255, 0.3);
                padding: 8px 20px;
                border-radius: 50px;
                font-size: 14px;
                font-weight: 600;
                margin-top: 10px;
              }
              .content {
                padding: 40px 30px;
              }
              .greeting {
                font-size: 20px;
                font-weight: 600;
                margin-bottom: 25px;
                color: #111827;
              }
              .promo-box {
                background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
                border: 3px solid #fbbf24;
                border-radius: 12px;
                padding: 30px;
                margin: 30px 0;
                text-align: center;
                box-shadow: 0 4px 15px rgba(251, 191, 36, 0.3);
              }
              .promo-box .emoji {
                font-size: 48px;
                display: block;
                margin-bottom: 15px;
              }
              .promo-box .code {
                background: white;
                padding: 15px 25px;
                border-radius: 8px;
                font-size: 24px;
                font-weight: 900;
                font-family: 'Courier New', monospace;
                letter-spacing: 2px;
                color: #f97316;
                margin: 15px 0;
                border: 3px solid #fbbf24;
                display: inline-block;
              }
              .promo-box .discount {
                font-size: 36px;
                color: #10b981;
                font-weight: 900;
                margin: 10px 0;
              }
              .promo-box .price {
                font-size: 28px;
                color: #1f2937;
                margin: 10px 0;
              }
              .promo-box .original-price {
                text-decoration: line-through;
                opacity: 0.6;
                font-size: 20px;
                color: #6b7280;
              }
              .message-box {
                background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
                border-left: 5px solid #10b981;
                padding: 20px 25px;
                border-radius: 10px;
                margin: 25px 0;
              }
              .message-box p {
                margin: 0;
                font-size: 16px;
                line-height: 1.7;
                color: #065f46;
              }
              .cta-section {
                text-align: center;
                margin: 40px 0;
                padding: 30px;
                background: linear-gradient(135deg, #fef2f2 0%, #fff7ed 100%);
                border-radius: 12px;
              }
              .cta-button {
                display: inline-block;
                background: linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%);
                color: white !important;
                padding: 18px 50px;
                text-decoration: none;
                border-radius: 50px;
                font-weight: 800;
                font-size: 20px;
                box-shadow: 0 10px 25px rgba(16, 185, 129, 0.4);
                transition: transform 0.3s, box-shadow 0.3s;
                text-align: center;
                border: 3px solid rgba(255, 255, 255, 0.3);
              }
              .cta-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 15px 35px rgba(16, 185, 129, 0.5);
              }
              .footer {
                background: #1f2937;
                color: #9ca3af;
                text-align: center;
                padding: 40px 30px;
              }
              .footer-logo {
                font-size: 24px;
                font-weight: 800;
                color: white;
                margin-bottom: 10px;
              }
              .footer p {
                margin: 5px 0;
                font-size: 14px;
              }
              .footer a {
                color: #10b981;
                text-decoration: none;
                font-weight: 600;
              }
            </style>
          </head>
          <body>
            <div class="email-wrapper">
              <div class="email-container">
                <!-- Header -->
                <div class="header">
                  <div class="header-content">
                    <h1>🎁 Special Offer Just For You!</h1>
                    <div class="header-badge">Exclusive Discount</div>
                  </div>
                </div>
                
                <!-- Content -->
                <div class="content">
                  <div class="greeting">Hi ${name} 👋</div>
                  
                  <div class="message-box">
                    <p>
                      <strong>We miss you!</strong><br><br>
                      We noticed you're no longer subscribed, and we'd love to have you back. 
                      As a special thank you for being a valued customer, we're offering you an exclusive discount to reactivate your subscription.
                    </p>
                  </div>

                  <!-- Promo Box -->
                  <div class="promo-box">
                    <span class="emoji">🎉</span>
                    <p style="font-size: 18px; margin-bottom: 15px; color: #92400e; font-weight: 700;">
                      Your Exclusive Discount Code
                    </p>
                    <div class="code">${promoCode}</div>
                    <div class="discount">${percentageOff}% OFF</div>
                    <div class="price">
                      <span class="original-price">£${basePrice.toFixed(2)}</span>
                      <br>
                      Now just <strong style="color: #10b981; font-size: 32px;">£${discountedPrice.toFixed(2)}</strong>/month
                    </div>
                    <p style="font-size: 16px; color: #92400e; margin-top: 15px; font-weight: 700;">
                      This offer applies for <strong style="font-size: 18px;">${months} ${monthsText}</strong>
                    </p>
                    <p style="font-size: 14px; color: #92400e; margin-top: 10px; font-weight: 600;">
                      Use this code when you resubscribe to claim your discount!
                    </p>
                  </div>

                  <p style="font-size: 16px; line-height: 1.8; margin: 25px 0; color: #374151;">
                    Don't miss out on this limited-time offer. Reactivate your subscription now and continue growing your personal training business with a professional website that works 24/7.
                  </p>

                  <!-- CTA Section -->
                  <div class="cta-section">
                    <p style="font-size: 17px; font-weight: 700; color: #111827; margin-bottom: 20px;">
                      Ready to get back on track?
                    </p>
                    <a href="${websiteLink}" class="cta-button">
                      Reactivate My Subscription
                    </a>
                    <p class="cta-subtitle" style="margin-top: 15px; font-size: 14px; color: #6b7280;">
                      Use code <strong>${promoCode}</strong> at checkout
                    </p>
                  </div>

                  <div style="background: #f9fafb; border-radius: 10px; padding: 20px; margin: 30px 0; text-align: center; border: 2px solid #e5e7eb;">
                    <p style="margin: 0; font-size: 14px; color: #4b5563;">
                      Questions? Reply to this email or contact us at{" "}
                      <a href="mailto:alexander.ptboost@gmail.com" style="color: #10b981; text-decoration: none; font-weight: 600;">
                        alexander.ptboost@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                <!-- Footer -->
                <div class="footer">
                  <div class="footer-logo">PTBoost</div>
                  <p>Professional Websites for Personal Trainers</p>
                  <p>
                    <a href="https://ptboost.co.uk">Visit our website</a>
                  </p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `
    })

    if (emailResult.error) {
      console.error('Error sending promo email:', emailResult.error)
      return NextResponse.json(
        { error: 'Failed to send promo email' },
        { status: 500 }
      )
    }

    console.log('✅ Promo email sent successfully to:', email)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in send-promo-mail:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

