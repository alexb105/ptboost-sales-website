import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function GET(request: Request) {
  try {
    // Verify the request is from a cron job (optional security)
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    console.log('🔍 Checking for expired subscriptions...')

    // Find all subscriptions that have expired (subscription_end_date has passed)
    const { data: expiredSubscriptions, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('subscribed', false)
      .not('subscription_end_date', 'is', null)
      .lte('subscription_end_date', new Date().toISOString())

    if (error) {
      console.error('❌ Error fetching expired subscriptions:', error)
      return NextResponse.json(
        { error: 'Failed to fetch expired subscriptions' },
        { status: 500 }
      )
    }

    if (!expiredSubscriptions || expiredSubscriptions.length === 0) {
      console.log('✅ No expired subscriptions found')
      return NextResponse.json({ 
        success: true,
        message: 'No expired subscriptions',
        count: 0
      })
    }

    console.log(`⚠️ Found ${expiredSubscriptions.length} expired subscription(s)`)

    // Prepare email content
    const adminEmail = process.env.ADMIN_EMAIL || 'alexanderbonnici214@gmail.com'
    
    const expiredList = expiredSubscriptions.map(sub => {
      const endDate = new Date(sub.subscription_end_date!)
      const daysOverdue = Math.floor((Date.now() - endDate.getTime()) / (1000 * 60 * 60 * 24))
      
      return `
        <div style="background: #fee; border: 2px solid #c00; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
          <h3 style="margin: 0 0 12px 0; color: #c00; font-size: 18px;">⚠️ ${sub.full_name}</h3>
          <div style="font-size: 14px; color: #333; line-height: 1.6;">
            <p style="margin: 4px 0;"><strong>Business:</strong> ${sub.business_name}</p>
            <p style="margin: 4px 0;"><strong>Email:</strong> ${sub.email}</p>
            <p style="margin: 4px 0;"><strong>Phone:</strong> ${sub.phone}</p>
            <p style="margin: 4px 0;"><strong>Subscription Ended:</strong> ${endDate.toLocaleDateString('en-GB')} (${daysOverdue} ${daysOverdue === 1 ? 'day' : 'days'} ago)</p>
            <p style="margin: 12px 0 0 0; padding: 12px; background: #fff; border-left: 4px solid #c00; font-weight: bold; color: #c00;">
              🚨 ACTION REQUIRED: Deactivate website on Netlify immediately!
            </p>
          </div>
        </div>
      `
    }).join('')

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
          <div style="background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); color: white; padding: 24px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 28px; font-weight: bold;">🚨 URGENT: Subscription Expired</h1>
            <p style="margin: 8px 0 0 0; font-size: 16px; opacity: 0.95;">
              ${expiredSubscriptions.length} ${expiredSubscriptions.length === 1 ? 'website needs' : 'websites need'} immediate deactivation
            </p>
          </div>
          
          <div style="background: white; padding: 32px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <p style="font-size: 16px; color: #555; margin: 0 0 24px 0;">
              The following subscription(s) have expired and customers should no longer have access to their websites. 
              <strong>Please deactivate these websites on Netlify immediately.</strong>
            </p>
            
            ${expiredList}
            
            <div style="margin-top: 32px; padding: 20px; background: #f0f9ff; border: 1px solid #0284c7; border-radius: 8px;">
              <h3 style="margin: 0 0 12px 0; color: #0284c7; font-size: 16px;">📋 How to Deactivate on Netlify:</h3>
              <ol style="margin: 0; padding-left: 24px; color: #333; line-height: 1.8;">
                <li>Log in to <a href="https://app.netlify.com" style="color: #0284c7; text-decoration: none; font-weight: 500;">Netlify Dashboard</a></li>
                <li>Find the customer's website</li>
                <li>Go to <strong>Site Settings → General → Danger Zone</strong></li>
                <li>Click <strong>"Stop auto publishing"</strong> or <strong>"Delete site"</strong></li>
              </ol>
            </div>
            
            <div style="margin-top: 24px; padding: 16px; background: #fffbeb; border: 1px solid #f59e0b; border-radius: 8px; font-size: 14px; color: #92400e;">
              <strong>💡 Tip:</strong> After deactivating, update the customer's record in the admin dashboard to mark the website as deactivated.
            </div>
          </div>
          
          <div style="margin-top: 24px; padding: 16px; text-align: center; color: #666; font-size: 12px;">
            <p style="margin: 0;">This is an automated notification from PTBoost Subscription Manager</p>
            <p style="margin: 8px 0 0 0;">Sent: ${new Date().toLocaleString('en-GB')}</p>
          </div>
        </body>
      </html>
    `

    // Send email to admin
    try {
      const emailResponse = await resend.emails.send({
        from: 'PTBoost Alerts <noreply@ptboost.co.uk>',
        to: adminEmail,
        subject: `🚨 URGENT: ${expiredSubscriptions.length} Expired Subscription${expiredSubscriptions.length === 1 ? '' : 's'} - Deactivate Website${expiredSubscriptions.length === 1 ? '' : 's'}`,
        html: emailHtml,
      })

      console.log('✅ Expiration alert email sent to admin:', emailResponse)
    } catch (emailError) {
      console.error('❌ Error sending expiration alert email:', emailError)
      return NextResponse.json(
        { 
          success: false,
          error: 'Failed to send email notification',
          expiredCount: expiredSubscriptions.length 
        },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true,
      message: `Found ${expiredSubscriptions.length} expired subscription(s), email sent to admin`,
      expiredSubscriptions: expiredSubscriptions.map(sub => ({
        id: sub.id,
        name: sub.full_name,
        email: sub.email,
        business: sub.business_name,
        endDate: sub.subscription_end_date
      }))
    })
  } catch (error: any) {
    console.error('❌ Error in check-expired-subscriptions API:', error)
    
    return NextResponse.json(
      { error: 'Failed to check expired subscriptions. Please try again.' },
      { status: 500 }
    )
  }
}

