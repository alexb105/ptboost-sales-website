import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Send notification to you (business owner)
    await resend.emails.send({
      from: 'PTBoost Notifications <onboarding@resend.dev>',
      to: 'ptboost.info@gmail.com',
      subject: '🔔 New Lead: Someone Wants to Be Notified!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #ff6b35;">New Notification Request</h2>
          <p>Someone wants to be notified when spots open up!</p>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 10px 0 0 0;"><strong>Requested:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <p style="color: #666;">
            Make sure to reach out to them when you have spots available!
          </p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
          <p style="color: #999; font-size: 12px;">
            This notification was sent from your PTBoost website.
          </p>
        </div>
      `
    })

    // Send confirmation email to the user
    await resend.emails.send({
      from: 'PTBoost <onboarding@resend.dev>',
      to: email,
      subject: 'You\'re on the List! 🎉',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #ff6b35; margin: 0; font-size: 28px;">Thank You!</h1>
            <p style="color: #666; font-size: 16px; margin-top: 10px;">Your request has been received</p>
          </div>
          
          <div style="background: linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%); padding: 30px; border-radius: 12px; color: white; margin-bottom: 30px;">
            <h2 style="margin: 0 0 15px 0; font-size: 22px;">You're on the Priority List! ✓</h2>
            <p style="margin: 0; font-size: 16px; line-height: 1.6;">
              Thanks for your interest in getting a high-converting website for your personal training business. 
              I'll notify you as soon as a spot opens up.
            </p>
          </div>
          
          <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; border-left: 4px solid #ff6b35; margin-bottom: 25px;">
            <h3 style="margin: 0 0 12px 0; color: #333; font-size: 18px;">What Happens Next?</h3>
            <ul style="margin: 0; padding-left: 20px; color: #555; line-height: 1.8;">
              <li>I'll reach out to you personally when capacity opens</li>
              <li>You'll get priority access before public availability</li>
              <li>We can start working on your site within 1-2 weeks</li>
            </ul>
          </div>
          
          <div style="background: #fff; padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0; margin-bottom: 25px;">
            <p style="margin: 0 0 15px 0; color: #333; font-size: 16px;">
              <strong>Why the wait?</strong>
            </p>
            <p style="margin: 0; color: #666; font-size: 14px; line-height: 1.6;">
              I limit my client load to ensure every website gets the attention, speed, and quality it deserves. 
              This means your site will be built right – fast, professional, and ready to convert.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #666; font-size: 14px; margin: 0;">
              Questions? Just reply to this email – I read every message.
            </p>
          </div>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e0e0e0;">
          
          <div style="text-align: center;">
            <p style="color: #999; font-size: 12px; margin: 0;">
              PTBoost - Professional Websites for Personal Trainers<br>
              You're receiving this because you signed up for notifications at ptboost.com
            </p>
          </div>
        </div>
      `
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending notification:', error)
    return NextResponse.json(
      { error: 'Failed to send notification' },
      { status: 500 }
    )
  }
}

