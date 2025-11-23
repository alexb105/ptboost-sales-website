/**
 * Email template for account deletion by admin
 * Sent when an admin deletes a user's account from the admin panel
 */
export function getAdminAccountDeletionEmail(data: {
  fullName: string
  email: string
  businessName?: string
  siteUrl?: string
}): string {
  const contactEmail = 'ptboost.info@gmail.com'
  
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
            background: linear-gradient(135deg, #fee2e2 0%, #fecaca 50%, #fef3c7 100%);
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
            background: linear-gradient(135deg, #dc2626 0%, #b91c1c 50%, #991b1b 100%);
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
            background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
            color: white;
            padding: 12px 24px;
            border-radius: 50px;
            font-weight: 700;
            font-size: 14px;
            margin-bottom: 30px;
            box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
          }
          .message-card {
            background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
            padding: 30px;
            border-radius: 16px;
            margin-bottom: 25px;
            border: 2px solid rgba(220, 38, 38, 0.2);
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
            background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
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
            color: #dc2626;
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
          .warning-box {
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
            padding: 25px;
            border-radius: 16px;
            margin-bottom: 25px;
            border: 2px solid #f59e0b;
            text-align: center;
          }
          .warning-box h3 {
            font-size: 22px;
            font-weight: 800;
            color: #92400e;
            margin: 0 0 10px 0;
          }
          .warning-box p {
            font-size: 16px;
            color: #78350f;
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
          .contact-link {
            color: #dc2626;
            font-weight: 700;
            text-decoration: none;
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
              <h1>⚠️ Account Deleted</h1>
              <p>Your PTBoost Account Has Been Removed</p>
            </div>
          </div>
          
          <div class="content">
            <div class="alert-badge">
              🚨 Account Deletion Notice
            </div>

            <div class="message-card">
              <p>
                <strong>Hi ${data.fullName || 'Customer'},</strong>
              </p>
              <p>
                This email is to inform you that your PTBoost account${data.businessName ? ` for <strong>${data.businessName}</strong>` : ''} has been permanently deleted from our system by our admin team.
              </p>
              <p>
                This action has been completed and cannot be reversed.
              </p>
            </div>

            <div class="section">
              <h2 class="section-title">📋 What Was Deleted</h2>
              <ul class="info-list">
                <li>
                  <p><strong>Your website files</strong> - All website files have been permanently removed and cannot be recovered</p>
                </li>
                <li>
                  <p><strong>Your account data</strong> - All personal information, booking details, and account data have been removed from our systems</p>
                </li>
                <li>
                  <p><strong>Stripe subscription</strong> - Any active subscriptions have been cancelled and your Stripe customer record has been deleted</p>
                </li>
                <li>
                  <p><strong>Website access</strong> - Your website is no longer live and is no longer accessible</p>
                </li>
              </ul>
            </div>

            <div class="warning-box">
              <h3>⚠️ Important</h3>
              <p>This action is <strong>irreversible</strong>. We cannot recover your account or website files.</p>
            </div>

            <div class="section" style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-color: #3b82f6;">
              <h2 class="section-title" style="color: #1e40af;">💬 Did Not Request This?</h2>
              <p style="margin: 0; font-size: 16px; color: #1e3a8a; line-height: 1.7; font-weight: 500;">
                If you did not request this deletion or believe this was done in error, please contact us immediately at 
                <a href="mailto:${contactEmail}" class="contact-link">${contactEmail}</a>. 
                We're here to help clarify any issues! 🚀
              </p>
            </div>

            <div class="section">
              <h2 class="section-title">🔄 Want to Return?</h2>
              <p style="margin: 0; font-size: 16px; color: #374151; line-height: 1.7; font-weight: 500;">
                If you change your mind in the future and would like to use PTBoost again, you'll need to create a new account 
                and purchase a new website. Visit <strong>ptboost.co.uk</strong> to get started.
              </p>
            </div>
          </div>

          <div class="footer">
            <div class="footer-brand">PTBoost</div>
            <p class="footer-text">
              Professional PT Websites<br>
              We're sorry to see you go. Thank you for being a part of PTBoost.
              <br /><br />
              Questions? Contact us at <a href="mailto:${contactEmail}" style="color: #f97316; text-decoration: none; font-weight: 700;">${contactEmail}</a>
            </p>
          </div>
        </div>
      </body>
    </html>
  `
}


