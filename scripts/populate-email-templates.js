/**
 * Script to populate email_templates table with hardcoded HTML from route files
 * Converts JavaScript template literals to template variable format
 * 
 * Usage: node scripts/populate-email-templates.js
 */

const { createClient } = require('@supabase/supabase-js')
const { readFile } = require('fs/promises')
const { join } = require('path')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

/**
 * Convert JavaScript template literals to template variable format
 */
function convertTemplateLiterals(html) {
  return html
    // Handle conditional expressions: ${bookingData.preferredColors ? `...` : ''}
    .replace(/\$\{bookingData\.(\w+) \? `([\s\S]*?)` : ''\}/g, '{if_$1}$2{/if_$1}')
    // Handle process.env references - convert to {siteUrl}
    .replace(/\$\{\(process\.env\.NEXT_PUBLIC_SITE_URL \|\| 'https:\/\/ptboost\.co\.uk'\)\.replace\(\/\\\/\$\/, ''\)\}/g, '{siteUrl}')
    .replace(/\$\{process\.env\.NEXT_PUBLIC_SITE_URL \|\| 'https:\/\/ptboost\.co\.uk'\)\.replace\(\/\\\/\$\/, ''\)\}/g, '{siteUrl}')
    // Handle bookingData variables: ${bookingData.fullName} -> {fullName}
    .replace(/\$\{bookingData\.(\w+)\}/g, '{$1}')
    // Handle booking variables: ${booking.full_name} -> {full_name}
    .replace(/\$\{booking\.(\w+)\}/g, '{$1}')
    // Handle simple variables: ${name} -> {name}
    .replace(/\$\{(\w+)\}/g, '{$1}')
    // Handle template literal backticks and newlines - clean up indentation
    .trim()
}

/**
 * Extract HTML from a route file between start and end patterns
 */
async function extractHtmlFromFile(filePath, startPattern, endPattern) {
  try {
    const fileContent = await readFile(filePath, 'utf-8')
    const startIndex = fileContent.indexOf(startPattern)
    if (startIndex === -1) {
      throw new Error(`Start pattern not found: ${startPattern}`)
    }
    
    const htmlStart = startIndex + startPattern.length
    const endIndex = fileContent.indexOf(endPattern, htmlStart)
    if (endIndex === -1) {
      throw new Error(`End pattern not found: ${endPattern}`)
    }
    
    let html = fileContent.substring(htmlStart, endIndex).trim()
    
    // Remove common leading indentation
    const lines = html.split('\n')
    if (lines.length > 0) {
      const nonEmptyLines = lines.filter(line => line.trim().length > 0)
      if (nonEmptyLines.length > 0) {
        const minIndent = nonEmptyLines.reduce((min, line) => {
          const indent = line.match(/^(\s*)/)?.[1]?.length || 0
          return Math.min(min, indent)
        }, Infinity)
        
        if (minIndent > 0 && minIndent < Infinity) {
          html = lines.map(line => {
            if (line.trim().length === 0) return line
            return line.substring(minIndent)
          }).join('\n')
        }
      }
    }
    
    return convertTemplateLiterals(html)
  } catch (error) {
    console.error(`Error extracting HTML from ${filePath}:`, error.message)
    throw error
  }
}

/**
 * Update a template in the database
 */
async function updateTemplate(templateKey, htmlContent) {
  const { data, error } = await supabase
    .from('email_templates')
    .update({ html_content: htmlContent })
    .eq('template_key', templateKey)
    .select()
  
  if (error) {
    throw new Error(`Failed to update ${templateKey}: ${error.message}`)
  }
  
  return data[0]
}

async function main() {
  console.log('🚀 Starting email template population...\n')
  
  const templates = [
    {
      key: 'customer_booking_confirmation',
      file: 'app/api/send-booking-email/route.ts',
      startPattern: 'const customerHtml = customerTemplate?.html || `',
      endPattern: '`\n    \n    const customerEmail = await resend.emails.send'
    },
    {
      key: 'developer_new_booking',
      file: 'app/api/send-booking-email/route.ts',
      startPattern: 'const developerHtml = developerTemplate?.html || `',
      endPattern: '`\n    \n    const { data, error } = await resend.emails.send'
    },
    {
      key: 'customer_pending_followup',
      file: 'app/api/send-pending-followup/route.ts',
      startPattern: 'subject: \'⏰ Complete Your Website Order - Limited Time Offer!\',\n      html: `',
      endPattern: '      `,\n    })'
    },
    {
      key: 'customer_waiting_list_notification',
      file: 'app/api/notify-waiting-list/route.ts',
      startPattern: 'subject: \'🎉 Great News! Spots Are Now Available at PTBoost\',\n      html: `',
      endPattern: '      `,\n    })'
    },
    {
      key: 'customer_waiting_list_confirmation',
      file: 'app/api/notify/route.ts',
      startPattern: 'subject: \'You\\\'re on the List! 🎉\',\n      html: `',
      endPattern: '      `\n    })'
    },
    {
      key: 'developer_waiting_list_signup',
      file: 'app/api/notify/route.ts',
      startPattern: 'subject: \'🔔 New Lead: Someone Wants to Be Notified!\',\n      html: `',
      endPattern: '      `\n    })'
    }
  ]
  
  const projectRoot = join(__dirname, '..')
  
  for (const template of templates) {
    try {
      console.log(`📝 Processing ${template.key}...`)
      const filePath = join(projectRoot, template.file)
      const htmlContent = await extractHtmlFromFile(filePath, template.startPattern, template.endPattern)
      
      const updated = await updateTemplate(template.key, htmlContent)
      console.log(`✅ Updated ${template.key} (${updated.template_name})\n`)
    } catch (error) {
      console.error(`❌ Failed to process ${template.key}:`, error.message)
      console.error('')
    }
  }
  
  console.log('✨ Template population complete!')
}

main().catch(console.error)

