import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { renderEmailTemplate, replaceTemplateVariables } from '@/lib/email-templates'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { templateKey, subject, htmlContent, adminPassword } = await request.json()

    if (!templateKey || !subject || !htmlContent) {
      return NextResponse.json(
        { error: 'templateKey, subject, and htmlContent are required' },
        { status: 400 }
      )
    }

    // Verify admin password
    const expectedPassword = process.env.ADMIN_PASSWORD
    if (!expectedPassword || adminPassword !== expectedPassword) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    // Replace variables with test data
    // The HTML should already be in our template variable format {variableName}
    // But if it still has JS template literals, convert them
    let processedHtml = htmlContent
      .replace(/\$\{bookingData\.(\w+)\}/g, '{$1}')
      .replace(/\$\{(\w+)\}/g, '{$1}')
      .replace(/\$\{booking\.(\w+)\}/g, '{$1}')
    
    const testVariables = {
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+44 1234 567890',
      businessName: 'Test Fitness Studio',
      location: 'London, UK',
      specialization: 'Strength Training',
      preferredColors: 'Blue and Orange',
      websiteGoals: 'Attract new clients and showcase services',
      additionalNotes: 'This is a test email',
      subscriptionPassword: 'TEST123',
      sessionId: 'test_session_123',
      name: 'John Doe',
      subscriptionLink: 'https://buy.stripe.com/test',
      websiteLink: 'https://ptboost.co.uk/#cta',
      siteUrl: (process.env.NEXT_PUBLIC_SITE_URL || 'https://ptboost.co.uk').replace(/\/$/, '')
    }

    const testSubject = replaceTemplateVariables(subject, testVariables)
    const testHtml = replaceTemplateVariables(processedHtml, testVariables)

    // Send test email
    const { data, error } = await resend.emails.send({
      from: 'PTBoost <noreply@ptboost.co.uk>',
      to: ['alexander.ptboost@gmail.com'],
      subject: `[TEST] ${testSubject}`,
      html: testHtml,
    })

    if (error) {
      console.error('Error sending test email:', error)
      return NextResponse.json(
        { error: 'Failed to send test email', details: error },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true,
      message: 'Test email sent successfully to alexander.ptboost@gmail.com',
      emailId: data?.id
    })
  } catch (error) {
    console.error('Error in test-email:', error)
    return NextResponse.json(
      { error: 'Failed to send test email' },
      { status: 500 }
    )
  }
}

