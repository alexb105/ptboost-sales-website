/**
 * Generate a unique subscription password
 * Format: XXX-XXX-XX (e.g., HL6-3PD-L9)
 * 
 * Uses uppercase alphanumeric characters (excluding similar-looking characters)
 * to make it easy to read and type
 */
export function generateSubscriptionPassword(): string {
  // Characters to use (excluding 0, O, 1, I, L to avoid confusion)
  const chars = '23456789ABCDEFGHJKMNPQRSTUVWXYZ'
  
  const generateSegment = (length: number): string => {
    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  // Generate format: XXX-XXX-XX
  const segment1 = generateSegment(3)
  const segment2 = generateSegment(3)
  const segment3 = generateSegment(2)

  return `${segment1}-${segment2}-${segment3}`
}


