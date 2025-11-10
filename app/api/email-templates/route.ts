import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// GET - Fetch all email templates or by type
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const templateType = searchParams.get('type') // 'customer' or 'developer'
    const templateKey = searchParams.get('key') // specific template key

    let query = supabase.from('email_templates').select('*')

    if (templateKey) {
      query = query.eq('template_key', templateKey).single()
    } else if (templateType) {
      query = query.eq('template_type', templateType)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching email templates:', error)
      return NextResponse.json(
        { error: 'Failed to fetch email templates' },
        { status: 500 }
      )
    }

    return NextResponse.json({ templates: data || [] })
  } catch (error) {
    console.error('Error in GET email templates:', error)
    return NextResponse.json(
      { error: 'Failed to fetch email templates' },
      { status: 500 }
    )
  }
}

// POST - Update an email template
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

    // Update the template
    const { data, error } = await supabase
      .from('email_templates')
      .update({
        subject,
        html_content: htmlContent,
        updated_at: new Date().toISOString()
      })
      .eq('template_key', templateKey)
      .select()
      .single()

    if (error) {
      console.error('Error updating email template:', error)
      return NextResponse.json(
        { error: 'Failed to update email template' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      template: data 
    })
  } catch (error) {
    console.error('Error in POST email templates:', error)
    return NextResponse.json(
      { error: 'Failed to update email template' },
      { status: 500 }
    )
  }
}

