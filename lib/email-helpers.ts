/**
 * Email helper functions to improve deliverability and reduce spam filtering
 */

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ptboost.co.uk'

/**
 * Get standard email headers to improve deliverability
 * These headers help prevent emails from being marked as spam
 */
export function getEmailHeaders(options?: {
  unsubscribeUrl?: string
  replyTo?: string
}) {
  const headers: Record<string, string> = {
    // Reply-To header for better deliverability
    'Reply-To': options?.replyTo || 'ptboost.info@gmail.com',
    
    // List-Unsubscribe headers (RFC 2369 and RFC 8058)
    // These are critical for inbox placement
    'List-Unsubscribe': `<${baseUrl}/unsubscribe>, <mailto:unsubscribe@ptboost.co.uk?subject=Unsubscribe>`,
    'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
    
    // Precedence header to indicate transactional email
    'Precedence': 'bulk',
    
    // Auto-Submitted header to indicate automated email
    'Auto-Submitted': 'auto-generated',
    
    // X-Mailer header
    'X-Mailer': 'PTBoost Email System',
  }

  return headers
}

/**
 * Clean subject line by removing or replacing emojis
 * Emojis in subject lines can trigger spam filters
 */
export function cleanSubjectLine(subject: string, keepEmojis: boolean = false): string {
  if (keepEmojis) {
    // Keep emojis but ensure subject is not too long
    return subject.length > 100 ? subject.substring(0, 97) + '...' : subject
  }
  
  // Remove emojis and clean up
  // This regex removes most common emojis
  const cleaned = subject
    .replace(/[\u{1F300}-\u{1F9FF}]/gu, '') // Emojis
    .replace(/[\u{2600}-\u{26FF}]/gu, '') // Misc symbols
    .replace(/[\u{2700}-\u{27BF}]/gu, '') // Dingbats
    .replace(/\s+/g, ' ') // Multiple spaces
    .trim()
  
  return cleaned || subject // Fallback to original if empty
}

/**
 * Get safe email sending options with proper headers
 */
export function getEmailOptions(options: {
  from: string
  to: string | string[]
  subject: string
  html: string
  replyTo?: string
  unsubscribeUrl?: string
  tags?: Array<{ name: string; value: string }>
}) {
  return {
    from: options.from,
    to: options.to,
    subject: cleanSubjectLine(options.subject, false), // Remove emojis from subject
    html: options.html,
    headers: getEmailHeaders({
      unsubscribeUrl: options.unsubscribeUrl,
      replyTo: options.replyTo,
    }),
    tags: options.tags || [],
  }
}

