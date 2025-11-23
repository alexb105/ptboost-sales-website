// email template: account deletion confirmation sent to customer (final notice)
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'
import { Resend } from 'resend'
import { getEmailOptions } from '@/lib/email-helpers'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
})

const resend = new Resend(process.env.RESEND_API_KEY)

// Use service role key for admin operations (more secure)
const supabaseAdmin = process.env.SUPABASE_SERVICE_ROLE_KEY
  ? createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )
  : createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

export async function DELETE(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Verify user credentials first
    const { data: booking, error: fetchError } = await supabaseAdmin
      .from('bookings')
      .select('id, email, full_name, subscription_password, stripe_customer_id')
      .eq('email', email)
      .eq('payment_status', 'completed')
      .not('stripe_customer_id', 'is', null)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (fetchError || !booking) {
      return NextResponse.json(
        { error: 'Account not found' },
        { status: 404 }
      )
    }

    // Verify password
    if (booking.subscription_password !== password.trim().toUpperCase()) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      )
    }

    // Send confirmation email BEFORE deletion
    if (process.env.RESEND_API_KEY) {
      try {
        console.log(`Sending account deletion confirmation email to: ${email}`)
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ptboost.co.uk'
        await resend.emails.send(
          getEmailOptions({
            from: 'PTBoost <noreply@ptboost.co.uk>',
            to: [email],
            subject: 'Account Deletion Confirmation - PTBoost',
            replyTo: 'ptboost.info@gmail.com',
            tags: [{ name: 'email_type', value: 'account_deletion' }],
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
                    gap: 15px;
                  }
                  .info-list li:last-child {
                    border-bottom: none;
                  }
                  .info-list li::before {
                    content: '•';
                    color: #dc2626;
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
                      <h1>Account Deletion Confirmed</h1>
                      <p>Your account has been permanently deleted</p>
                    </div>
                  </div>
                  
                  <div class="content">
                    <div class="warning-badge">
                      ⚠️ Account Deleted
                    </div>

                    <div class="message-card">
                      <p>
                        <strong>Dear ${booking.full_name || 'Customer'},</strong>
                      </p>
                      <p>
                        This email confirms that your PTBoost account has been permanently deleted as requested.
                      </p>
                    </div>

                    <div class="section">
                      <h2 class="section-title">What Was Deleted</h2>
                      <ul class="info-list">
                        <li>
                          <p><strong>Your website files</strong> - All website files have been permanently deleted and cannot be recovered</p>
                        </li>
                        <li>
                          <p><strong>Your account data</strong> - All personal information, booking details, and account data have been removed from our systems</p>
                        </li>
                        <li>
                          <p><strong>Stripe subscription</strong> - Your active subscription has been cancelled and your Stripe customer record has been deleted</p>
                        </li>
                        <li>
                          <p><strong>Website access</strong> - Your website is no longer live and is no longer accessible</p>
                        </li>
                      </ul>
                    </div>

                    <div class="section">
                      <h2 class="section-title">Important Information</h2>
                      <ul class="info-list">
                        <li>
                          <p>This action is <strong>irreversible</strong> - we cannot recover your account or website files</p>
                        </li>
                        <li>
                          <p>If you did not request this deletion, please contact us immediately at <a href="mailto:ptboost.info@gmail.com" style="color: #dc2626; font-weight: 700;">ptboost.info@gmail.com</a></p>
                        </li>
                        <li>
                          <p>If you change your mind in the future, you'll need to create a new account and purchase a new website</p>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div class="footer">
                    <div class="footer-brand">PTBoost</div>
                    <p class="footer-text">
                      Thank you for being a part of PTBoost. We're sorry to see you go.
                      <br /><br />
                      If you have any questions or concerns, please contact us at <a href="mailto:ptboost.info@gmail.com" style="color: #f97316; text-decoration: none; font-weight: 700;">ptboost.info@gmail.com</a>
                    </p>
                  </div>
                </div>
              </body>
            </html>
          `,
          })
        )`,
        })
        console.log(`Account deletion confirmation email sent successfully to: ${email}`)
      } catch (emailError) {
        console.error('Error sending account deletion confirmation email:', emailError)
        // Continue with deletion even if email fails
      }
    }

    // Cancel Stripe subscription and delete customer if exists
    if (booking.stripe_customer_id) {
      try {
        const customerId = booking.stripe_customer_id as string
        
        // Retrieve customer to check if it exists
        const customer = await stripe.customers.retrieve(customerId)
        
        if (!customer.deleted && 'id' in customer) {
          // Get all subscriptions for this customer
          const subscriptions = await stripe.subscriptions.list({
            customer: customerId,
            status: 'active',
          })

          // Cancel all active subscriptions
          for (const subscription of subscriptions.data) {
            await stripe.subscriptions.cancel(subscription.id)
            console.log(`Cancelled subscription: ${subscription.id}`)
          }

          // Delete the Stripe customer
          await stripe.customers.del(customerId)
          console.log(`Deleted Stripe customer: ${customerId}`)
        }
      } catch (stripeError) {
        console.error('Error deleting Stripe customer:', stripeError)
        // Continue with account deletion even if Stripe deletion fails
        // Log the error but don't block the account deletion
      }
    }

    // Delete the booking record (this will cascade delete related data if configured)
    const { error: deleteError } = await supabaseAdmin
      .from('bookings')
      .delete()
      .eq('id', booking.id)

    if (deleteError) {
      console.error('Error deleting account:', deleteError)
      return NextResponse.json(
        { error: 'Failed to delete account' },
        { status: 500 }
      )
    }

    console.log(`Account deleted successfully for: ${email}`)

    return NextResponse.json({ 
      success: true,
      message: 'Account deleted successfully. All website files have been permanently deleted.'
    })
  } catch (error) {
    console.error('Error in delete-account:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

