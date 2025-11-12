/**
 * Email template for subscription cancellation notification
 * Sent when an admin unsubscribes a user from the admin panel
 */
export function getUnsubscribeNotificationEmail(data: {
  fullName: string
  email: string
  businessName: string
  siteUrl?: string
}): string {
  const accountUrl = `${(data.siteUrl || 'https://ptboost.co.uk').replace(/\/$/, '')}/account`
  
  return `
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
            background: linear-gradient(135deg, #fee2e2 0%, #fef3c7 50%, #ede9fe 100%);
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
            background: linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%);
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
          .warning-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
            color: white;
            padding: 12px 24px;
            border-radius: 50px;
            font-weight: 700;
            font-size: 14px;
            margin-bottom: 30px;
            box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
          }
          .message-card {
            background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
            padding: 30px;
            border-radius: 16px;
            margin-bottom: 25px;
            border: 2px solid rgba(239, 68, 68, 0.2);
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
            background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
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
            gap: 12px;
          }
          .info-list li:last-child {
            border-bottom: none;
          }
          .info-list li::before {
            content: '•';
            color: #ef4444;
            font-size: 24px;
            font-weight: bold;
            line-height: 1;
          }
          .info-list li p {
            margin: 0;
            font-size: 16px;
            line-height: 1.6;
            color: #374151;
            font-weight: 500;
          }
          .button {
            display: inline-block;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 16px 32px;
            text-decoration: none;
            border-radius: 12px;
            font-weight: 800;
            font-size: 16px;
            margin-top: 20px;
            box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
            transition: transform 0.2s;
            text-align: center;
          }
          .button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(16, 185, 129, 0.5);
          }
          .highlight-box {
            background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
            padding: 25px;
            border-radius: 16px;
            margin-top: 25px;
            border: 2px solid #3b82f6;
            text-align: center;
          }
          .highlight-box h3 {
            font-size: 22px;
            font-weight: 800;
            color: #1e40af;
            margin: 0 0 10px 0;
          }
          .highlight-box p {
            font-size: 16px;
            color: #1e3a8a;
            margin: 0;
            font-weight: 600;
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
              <h1>⚠️ Subscription Cancelled</h1>
              <p>Your Subscription Status Update</p>
            </div>
          </div>
          
          <div class="content">
            <div class="warning-badge">
              ⚠️ Action Required
            </div>

            <div class="message-card">
              <p>
                <strong>Hi ${data.fullName},</strong>
              </p>
              <p>
                Your subscription for <strong>${data.businessName}</strong> has been cancelled and is no longer active.
              </p>
              <p>
                This means you will no longer have access to our monthly website services.
              </p>
            </div>

            <div class="section">
              <h2 class="section-title">📋 What This Means</h2>
              <ul class="info-list">
                <li>
                  <p><strong>No More Charges:</strong> Your monthly subscription payment has been stopped. You will not be charged again.</p>
                </li>
                <li>
                  <p><strong>Service Ending:</strong> Your website hosting and updates will be discontinued.</p>
                </li>
                <li>
                  <p><strong>Data Retention:</strong> Your account information will be retained for 30 days in case you wish to reactivate.</p>
                </li>
              </ul>
            </div>

            <div class="highlight-box">
              <h3>💡 Want to Continue?</h3>
              <p>You can reactivate your subscription at any time from your account dashboard.</p>
              <a style='color: white;' href="${accountUrl}" class="button">
                Reactivate Subscription →
              </a>
            </div>

            <div class="section" style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-color: #3b82f6;">
              <h2 class="section-title" style="color: #1e40af;">💬 Questions or Concerns?</h2>
              <p style="margin: 0; font-size: 16px; color: #1e3a8a; line-height: 1.7; font-weight: 500;">
                If you believe this was done in error or have any questions, please contact us at 
                <strong>ptboost.info@gmail.com</strong>. We're here to help! 🚀
              </p>
            </div>

            <div class="section">
              <h2 class="section-title">📞 Alternative: Website Buyout</h2>
              <p style="margin: 0; font-size: 16px; color: #374151; line-height: 1.7; font-weight: 500;">
                Did you know you can own your website completely for just <strong>£299</strong>? 
                No more monthly payments, full ownership, and all source code included. 
                Visit your account to learn more!
              </p>
            </div>
          </div>

          <div class="footer">
            <div class="footer-brand">PTBoost</div>
            <p class="footer-text">
              Professional PT Websites<br>
              We hope to work with you again soon!
            </p>
          </div>
        </div>
      </body>
    </html>
  `
}

