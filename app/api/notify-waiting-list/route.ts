// email template
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { name, email } = await request.json()

    console.log('Sending availability notification to:', email)
    
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured!')
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 })
    }

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }

    // Website CTA link
    const websiteLink = "https://ptboost.co.uk/#cta"

    // Send notification email
    console.log('Sending availability notification email...')
    const emailResult = await resend.emails.send({
      from: 'PTBoost <noreply@ptboost.co.uk>',
      to: [email],
      subject: '🎉 Great News! Spots Are Now Available at PTBoost',
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
                background: linear-gradient(135deg, #f97316 0%, #ea580c 50%, #dc2626 100%);
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
              .highlight-box {
                background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
                border: 3px solid #fbbf24;
                border-radius: 12px;
                padding: 25px;
                margin: 30px 0;
                text-align: center;
                box-shadow: 0 4px 15px rgba(251, 191, 36, 0.3);
              }
              .highlight-box .emoji {
                font-size: 36px;
                display: block;
                margin-bottom: 10px;
              }
              .highlight-box p {
                margin: 0;
                font-size: 18px;
                font-weight: 700;
                color: #92400e;
              }
              .highlight-box .price {
                font-size: 32px;
                color: #f97316;
                margin: 5px 0;
              }
              .message-box {
                background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
                border-left: 5px solid #f97316;
                padding: 20px 25px;
                border-radius: 10px;
                margin: 25px 0;
              }
              .message-box p {
                margin: 0;
                font-size: 16px;
                line-height: 1.7;
              }
              .message-box strong {
                color: #dc2626;
                font-size: 18px;
              }
              .features-section {
                background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
                border-radius: 12px;
                padding: 30px;
                margin: 30px 0;
                box-shadow: 0 4px 15px rgba(34, 197, 94, 0.1);
              }
              .features-section h3 {
                color: #065f46;
                margin: 0 0 20px 0;
                font-size: 22px;
                text-align: center;
                font-weight: 800;
              }
              .features-grid {
                display: grid;
                gap: 15px;
              }
              .feature-item {
                display: flex;
                align-items: flex-start;
                gap: 12px;
                background: white;
                padding: 15px;
                border-radius: 10px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.05);
                transition: transform 0.2s;
              }
              .feature-icon {
                flex-shrink: 0;
                width: 28px;
                height: 28px;
                background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                color: white;
                font-weight: bold;
              }
              .feature-content {
                flex: 1;
              }
              .feature-content strong {
                display: block;
                color: #111827;
                font-size: 15px;
                margin-bottom: 3px;
              }
              .feature-content span {
                color: #6b7280;
                font-size: 13px;
                line-height: 1.5;
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
                background: linear-gradient(135deg, #f97316 0%, #ea580c 50%, #dc2626 100%);
                color: white !important;
                padding: 18px 50px;
                text-decoration: none;
                border-radius: 50px;
                font-weight: 800;
                font-size: 20px;
                box-shadow: 0 10px 25px rgba(249, 115, 22, 0.4);
                transition: transform 0.3s, box-shadow 0.3s;
                text-align: center;
                border: 3px solid rgba(255, 255, 255, 0.3);
              }
              .cta-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 15px 35px rgba(249, 115, 22, 0.5);
              }
              .cta-subtitle {
                margin-top: 15px;
                font-size: 14px;
                color: #6b7280;
              }
              .link-box {
                background: #f9fafb;
                border: 2px dashed #d1d5db;
                border-radius: 10px;
                padding: 20px;
                margin: 25px 0;
                text-align: center;
              }
              .link-box p {
                margin: 0 0 10px 0;
                font-size: 13px;
                color: #6b7280;
                font-weight: 600;
              }
              .link-box a {
                color: #f97316;
                word-break: break-all;
                font-size: 13px;
                text-decoration: none;
                font-weight: 500;
              }
              .guarantee-box {
                background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
                border: 2px solid #3b82f6;
                border-radius: 12px;
                padding: 20px;
                margin: 30px 0;
                text-align: center;
              }
              .guarantee-box .shield {
                font-size: 40px;
                display: block;
                margin-bottom: 10px;
              }
              .guarantee-box p {
                margin: 0;
                font-size: 15px;
                color: #1e40af;
                font-weight: 600;
                line-height: 1.6;
              }
              .contact-box {
                background: #fafafa;
                border-radius: 10px;
                padding: 20px;
                margin: 30px 0;
                text-align: center;
                border: 2px solid #e5e7eb;
              }
              .contact-box p {
                margin: 0;
                font-size: 14px;
                color: #4b5563;
              }
              .contact-box a {
                color: #f97316;
                text-decoration: none;
                font-weight: 600;
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
                color: #f97316;
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
                    <h1>🎉 Spots Are Now Available!</h1>
                    <div class="header-badge">⚡ Exclusive Launch Pricing</div>
                  </div>
                </div>
                
                <!-- Content -->
                <div class="content">
                  <div class="greeting">Hi ${name} 👋</div>
                  
                  <div class="message-box">
                    <p>
                      <strong>You asked to be notified when spots opened up.</strong><br><br>
                      Well, a spot just became available — and I wanted you to be the first to know before I announce it publicly.
                    </p>
                  </div>

                  <p style="font-size: 16px; line-height: 1.8; margin: 25px 0; color: #374151;">
                    Here's the reality: While other PTs are stuck spending £2,000-5,000 on agency websites (or worse, relying on Instagram's algorithm), 
                    you have a chance to lock in a <strong style="color: #f97316;">professional, conversion-optimized website for just £7.99.</strong>
                  </p>

                  <!-- Highlight Box -->
                  <div class="highlight-box">
                    <span class="emoji">⚡</span>
                    <p style="font-size: 16px; margin-bottom: 10px;">Your Exclusive Price</p>
                    <div class="price">£7.99</div>
                    <p style="font-size: 14px; color: #6b7280; margin-top: 5px;">
                      First 50 sites only<br>
                      <span style="text-decoration: line-through; opacity: 0.7;">Regular price: £299</span> 
                      <span style="font-weight: 800; color: #dc2626;"> • Save £240</span>
                    </p>
                    <p style="font-size: 13px; color: #92400e; margin-top: 12px; font-weight: 600;">
                      ⏰ This pricing won't last. Once I hit 50 sites, it goes to £299. No exceptions.
                    </p>
                  </div>

                  <!-- What This Means Section -->
                  <div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border-radius: 12px; padding: 25px; margin: 30px 0; border-left: 5px solid #dc2626;">
                    <h3 style="color: #991b1b; margin: 0 0 15px 0; font-size: 20px; font-weight: 800;">
                      🎯 What This Actually Means For Your Business
                    </h3>
                    <ul style="list-style: none; padding: 0; margin: 0; color: #374151;">
                      <li style="margin: 12px 0; padding-left: 0; font-size: 15px; line-height: 1.7;">
                        <strong style="color: #dc2626;">→</strong> Stop competing on Instagram where the algorithm controls your business
                      </li>
                      <li style="margin: 12px 0; padding-left: 0; font-size: 15px; line-height: 1.7;">
                        <strong style="color: #dc2626;">→</strong> Book clients 24/7, even while you're sleeping or training other clients
                      </li>
                      <li style="margin: 12px 0; padding-left: 0; font-size: 15px; line-height: 1.7;">
                        <strong style="color: #dc2626;">→</strong> Look more professional than 95% of personal trainers in your area
                      </li>
                      <li style="margin: 12px 0; padding-left: 0; font-size: 15px; line-height: 1.7;">
                        <strong style="color: #dc2626;">→</strong> No monthly fees eating into your profits (most website builders charge £20-50/month)
                      </li>
                    </ul>
                  </div>

                  <!-- Features Section -->
                  <div class="features-section">
                    <h3>✨ Everything You Get</h3>
                    <div class="features-grid">
                      <div class="feature-item">
                        <div class="feature-icon">✓</div>
                        <div class="feature-content">
                          <strong>Premium Single-Page Website</strong>
                          <span>Psychology-driven design that converts visitors into paying clients</span>
                        </div>
                      </div>
                      <div class="feature-item">
                        <div class="feature-icon">✓</div>
                        <div class="feature-content">
                          <strong>Mobile-First Design</strong>
                          <span>Perfect on every device - because 80% of your clients browse on mobile</span>
                        </div>
                      </div>
                      <div class="feature-item">
                        <div class="feature-icon">✓</div>
                        <div class="feature-content">
                          <strong>Free Hosting Forever</strong>
                          <span>Lightning-fast servers, zero monthly fees, zero hidden costs. Ever.</span>
                        </div>
                      </div>
                      <div class="feature-item">
                        <div class="feature-icon">✓</div>
                        <div class="feature-content">
                          <strong>Smart Lead Capture System</strong>
                          <span>Automatically collect client details and emails - build your list while you train</span>
                        </div>
                      </div>
                      <div class="feature-item">
                        <div class="feature-icon">✓</div>
                        <div class="feature-content">
                          <strong>7-Day Launch Guarantee</strong>
                          <span>Your site goes live within 7 days. Not 4 weeks. Not "when we get to it." 7 days.</span>
                        </div>
                      </div>
                      <div class="feature-item">
                        <div class="feature-icon">✓</div>
                        <div class="feature-content">
                          <strong>Professional Copywriting</strong>
                          <span>I handle all the words so you don't have to. No writing skills needed.</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Comparison Section -->
                  <div style="background: white; border: 2px solid #e5e7eb; border-radius: 12px; padding: 25px; margin: 30px 0;">
                    <h3 style="color: #111827; margin: 0 0 20px 0; font-size: 20px; font-weight: 800; text-align: center;">
                      The Real Cost Comparison
                    </h3>
                    <table style="width: 100%; border-collapse: collapse;">
                      <thead>
                        <tr style="background: #f9fafb;">
                          <th style="padding: 12px; text-align: left; font-size: 13px; color: #6b7280; border-bottom: 2px solid #e5e7eb;"></th>
                          <th style="padding: 12px; text-align: center; font-size: 13px; color: #6b7280; border-bottom: 2px solid #e5e7eb;">Agencies</th>
                          <th style="padding: 12px; text-align: center; font-size: 13px; font-weight: 800; color: #f97316; border-bottom: 2px solid #e5e7eb;">PTBoost</th>
                        </tr>
                      </thead>
                      <tbody style="font-size: 14px;">
                        <tr>
                          <td style="padding: 12px; border-bottom: 1px solid #f3f4f6;">Upfront Cost</td>
                          <td style="padding: 12px; text-align: center; color: #dc2626; font-weight: 600; border-bottom: 1px solid #f3f4f6;">£2,000-5,000</td>
                          <td style="padding: 12px; text-align: center; color: #059669; font-weight: 800; border-bottom: 1px solid #f3f4f6;">£7.99</td>
                        </tr>
                        <tr>
                          <td style="padding: 12px; border-bottom: 1px solid #f3f4f6;">Monthly Hosting</td>
                          <td style="padding: 12px; text-align: center; color: #dc2626; font-weight: 600; border-bottom: 1px solid #f3f4f6;">£20-50/mo</td>
                          <td style="padding: 12px; text-align: center; color: #059669; font-weight: 800; border-bottom: 1px solid #f3f4f6;">£0 Forever</td>
                        </tr>
                        <tr>
                          <td style="padding: 12px; border-bottom: 1px solid #f3f4f6;">Launch Time</td>
                          <td style="padding: 12px; text-align: center; color: #dc2626; font-weight: 600; border-bottom: 1px solid #f3f4f6;">4-8 weeks</td>
                          <td style="padding: 12px; text-align: center; color: #059669; font-weight: 800; border-bottom: 1px solid #f3f4f6;">7 Days</td>
                        </tr>
                        <tr style="background: #f0fdf4;">
                          <td style="padding: 12px; font-weight: 800; border-top: 2px solid #e5e7eb;">First Year Total</td>
                          <td style="padding: 12px; text-align: center; color: #dc2626; font-weight: 800; font-size: 16px; border-top: 2px solid #e5e7eb;">£2,240-5,600</td>
                          <td style="padding: 12px; text-align: center; color: #059669; font-weight: 800; font-size: 18px; border-top: 2px solid #e5e7eb;">£7.99</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <!-- Guarantee -->
                  <div class="guarantee-box">
                    <span class="shield">🛡️</span>
                    <p style="font-size: 18px; margin-bottom: 12px; color: #1e40af; font-weight: 800;">
                      My Personal 7-Day Money-Back Guarantee
                    </p>
                    <p style="font-size: 15px; line-height: 1.7;">
                      I'll build your site. You test it for 7 days. Show it to friends, family, potential clients. 
                      If you're not 100% thrilled with it, I'll refund every penny. No questions asked, no hard feelings.
                    </p>
                    <p style="font-size: 14px; margin-top: 12px; color: #1e40af; font-weight: 600;">
                      You literally can't lose. Either you get an amazing website, or you get your money back.
                    </p>
                  </div>

                  <!-- Urgency Box -->
                  <div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border: 3px solid #dc2626; border-radius: 12px; padding: 25px; margin: 30px 0; text-align: center;">
                    <p style="margin: 0; font-size: 18px; font-weight: 800; color: #991b1b; line-height: 1.6;">
                      ⚠️ Fair Warning: This Price Is Only Available RIGHT NOW
                    </p>
                    <p style="margin: 15px 0 0 0; font-size: 15px; color: #7f1d1d; line-height: 1.7;">
                      Once this spot is taken, the next person on the waiting list gets it at £7.99.<br>
                      And when I hit 50 total sites? Everyone pays £7.99. No grandfather clause. No exceptions.
                    </p>
                  </div>

                  <!-- CTA Section -->
                  <div class="cta-section">
                    <p style="font-size: 17px; font-weight: 700; color: #111827; margin-bottom: 20px;">
                      Ready to stop relying on Instagram and start getting more leads on autopilot?
                    </p>
                    <a href="${websiteLink}" class="cta-button">
                      🚀 Yes, Claim My £7.99 Website Now
                    </a>
                    <div class="cta-subtitle">
                      ⏰ This spot won't last • See full details & secure your spot
                    </div>
                  </div>

                  <!-- Link Box -->
                  <div class="link-box">
                    <p>Or visit this link:</p>
                    <a href="${websiteLink}">${websiteLink}</a>
                  </div>

                  <!-- P.S. Section -->
                  <div style="background: #fffbeb; border-left: 4px solid #f59e0b; border-radius: 8px; padding: 20px; margin: 30px 0;">
                    <p style="margin: 0 0 12px 0; font-size: 16px; font-weight: 800; color: #92400e;">
                      P.S. — Still on the fence?
                    </p>
                    <p style="margin: 0; font-size: 15px; color: #78350f; line-height: 1.7;">
                      Think about it: You're ONE website away from looking as professional as the PTs charging £80+/session. 
                      You're ONE website away from having clients find you on Google instead of scrolling endlessly on Instagram. 
                      And you're ONE click away from securing £7.99 pricing before it jumps to £299.
                    </p>
                    <p style="margin: 15px 0 0 0; font-size: 15px; color: #78350f; line-height: 1.7; font-weight: 600;">
                      The worst case? You test it for 7 days, don't like it, and get a full refund. The best case? 
                      Your business finally has the professional online presence it deserves.
                    </p>
                  </div>

                  <div style="background: #f0fdf4; border: 2px solid #10b981; border-radius: 12px; padding: 20px; margin: 30px 0; text-align: center;">
                    <p style="margin: 0; font-size: 15px; color: #065f46; font-weight: 700; line-height: 1.7;">
                      ✅ I contacted you because you asked to be notified.<br>
                      ✅ A spot just opened up and it's yours if you want it.<br>
                      ✅ The price is £7.99 today. Tomorrow? It might be £299.
                    </p>
                    <p style="margin: 15px 0 0 0; font-size: 14px; color: #047857;">
                      The decision is yours. But the clock is ticking. ⏰
                    </p>
                  </div>

                  <!-- Contact Box -->
                  <div class="contact-box">
                    <p>
                      <strong>Questions? Concerns? Want to chat first?</strong><br>
                      Reply to this email or reach out at 
                      <a href="mailto:ptboost.info@gmail.com">ptboost.info@gmail.com</a>
                    </p>
                    <p style="margin-top: 10px; font-size: 13px; color: #6b7280;">
                      I usually respond within a few hours. Happy to answer anything before you commit.
                    </p>
                  </div>
                </div>

                <!-- Footer -->
                <div class="footer">
                  <div class="footer-logo">⚡ PTBoost</div>
                  <p>Professional Websites for Personal Trainers</p>
                  <p style="margin-top: 15px;">
                    <a href="https://ptboost.co.uk">Visit Our Website</a>
                  </p>
                  <p style="margin-top: 20px; font-size: 12px;">
                    You're receiving this because you joined our waiting list.<br>
                    We'll only email you about your website project.
                  </p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    })

    console.log('Email sent successfully:', emailResult)

    return NextResponse.json({ 
      success: true, 
      message: 'Notification email sent successfully',
      emailId: emailResult.data?.id 
    })

  } catch (error) {
    console.error('Error sending notification email:', error)
    return NextResponse.json(
      { error: 'Failed to send notification email' },
      { status: 500 }
    )
  }
}

