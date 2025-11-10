import { NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'

// This endpoint extracts the hardcoded HTML from email route files
// Used when the database template is empty
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const templateKey = searchParams.get('key')

    if (!templateKey) {
      return NextResponse.json(
        { error: 'Template key is required' },
        { status: 400 }
      )
    }

    // Map template keys to their route files and extraction patterns
    const templateMap: Record<string, { file: string; startPattern: string; endPattern: string }> = {
      'customer_booking_confirmation': {
        file: 'app/api/send-booking-email/route.ts',
        startPattern: 'const customerHtml = customerTemplate?.html || `',
        endPattern: '`\n    \n    const customerEmail = await resend.emails.send({'
      },
      'developer_new_booking': {
        file: 'app/api/send-booking-email/route.ts',
        startPattern: 'const developerHtml = developerTemplate?.html || `',
        endPattern: '`\n    \n    const { data, error } = await resend.emails.send({'
      },
      'customer_pending_followup': {
        file: 'app/api/send-pending-followup/route.ts',
        startPattern: 'subject: \'⏰ Complete Your Website Order - Limited Time Offer!\',\n      html: `',
        endPattern: '      `,\n    })'
      },
      'customer_waiting_list_notification': {
        file: 'app/api/notify-waiting-list/route.ts',
        startPattern: 'subject: \'🎉 Great News! Spots Are Now Available at PTBoost\',\n      html: `',
        endPattern: '      `,\n    })'
      },
      'customer_waiting_list_confirmation': {
        file: 'app/api/notify/route.ts',
        startPattern: 'subject: \'You\\\'re on the List! 🎉\',\n      html: `',
        endPattern: '      `\n    })'
      },
      'developer_waiting_list_signup': {
        file: 'app/api/notify/route.ts',
        startPattern: 'subject: \'🔔 New Lead: Someone Wants to Be Notified!\',\n      html: `',
        endPattern: '      `\n    })'
      }
    }

    const templateInfo = templateMap[templateKey]
    if (!templateInfo) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      )
    }

    try {
      // Read the route file
      const filePath = join(process.cwd(), templateInfo.file)
      console.log('Reading file:', filePath)
      
      let fileContent: string
      try {
        fileContent = await readFile(filePath, 'utf-8')
      } catch (readError) {
        console.error('Error reading file:', readError)
        return NextResponse.json(
          { error: `Could not read file: ${templateInfo.file}`, details: readError instanceof Error ? readError.message : String(readError) },
          { status: 500 }
        )
      }
      
      // Find the start and end positions
      const startIndex = fileContent.indexOf(templateInfo.startPattern)
      if (startIndex === -1) {
        console.error('Start pattern not found:', templateInfo.startPattern)
        console.error('File content preview:', fileContent.substring(0, 500))
        return NextResponse.json(
          { error: 'Could not find start pattern in route file', pattern: templateInfo.startPattern },
          { status: 500 }
        )
      }
      
      const htmlStart = startIndex + templateInfo.startPattern.length
      const endIndex = fileContent.indexOf(templateInfo.endPattern, htmlStart)
      if (endIndex === -1) {
        console.error('End pattern not found:', templateInfo.endPattern)
        console.error('Content after start:', fileContent.substring(htmlStart, htmlStart + 200))
        return NextResponse.json(
          { error: 'Could not find end pattern in route file', pattern: templateInfo.endPattern },
          { status: 500 }
        )
      }
      
      // Extract HTML
      let html = fileContent.substring(htmlStart, endIndex)
      
      // Clean up the HTML - remove leading/trailing whitespace
      html = html.trim()
      
      // Fix indentation - remove common leading whitespace from all lines
      const lines = html.split('\n')
      if (lines.length > 0) {
        // Find the minimum indentation (excluding empty lines)
        const nonEmptyLines = lines.filter(line => line.trim().length > 0)
        if (nonEmptyLines.length > 0) {
          const minIndent = nonEmptyLines.reduce((min, line) => {
            const indent = line.match(/^(\s*)/)?.[1]?.length || 0
            return Math.min(min, indent)
          }, Infinity)
          
          // Remove the minimum indentation from all lines
          if (minIndent > 0 && minIndent < Infinity) {
            html = lines.map(line => {
              if (line.trim().length === 0) return line
              return line.substring(minIndent)
            }).join('\n')
          }
        }
      }
      
      // Convert JavaScript template literals to our template variable format
      // ${bookingData.fullName} -> {fullName}
      // ${booking.full_name} -> {full_name}
      // ${name} -> {name}
      // Handle conditionals: ${bookingData.preferredColors ? `...` : ''} -> {if_preferredColors}...{/if_preferredColors}
      html = html
        // Handle conditional expressions first (before simple replacements)
        .replace(/\$\{bookingData\.(\w+) \? `([\s\S]*?)` : ''\}/g, '{if_$1}$2{/if_$1}')
        // Handle process.env references - convert to a placeholder
        .replace(/\$\{\(process\.env\.NEXT_PUBLIC_SITE_URL \|\| 'https:\/\/ptboost\.co\.uk'\)\.replace\(\/\\\/\$\/, ''\)\}/g, '{siteUrl}')
        .replace(/\$\{process\.env\.NEXT_PUBLIC_SITE_URL \|\| 'https:\/\/ptboost\.co\.uk'\)\.replace\(\/\\\/\$\/, ''\)\}/g, '{siteUrl}')
        // Then handle simple variable replacements
        .replace(/\$\{bookingData\.(\w+)\}/g, '{$1}')
        .replace(/\$\{booking\.(\w+)\}/g, '{$1}')
        .replace(/\$\{(\w+)\}/g, '{$1}')
      
      return NextResponse.json({ html })
    } catch (fileError) {
      console.error('Error reading route file:', fileError)
      return NextResponse.json(
        { error: 'Could not read route file' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error in get-template-fallback:', error)
    return NextResponse.json(
      { error: 'Failed to get template fallback' },
      { status: 500 }
    )
  }
}
