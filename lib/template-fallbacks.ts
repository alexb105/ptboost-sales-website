/**
 * Hardcoded HTML fallbacks for email templates
 * These are used when the database template is empty
 * Users can copy these into the database through the admin UI
 */

export function getTemplateFallback(templateKey: string): string {
  // Return empty string - templates will be populated from the email route files
  // Users can copy the HTML from those files into the database
  // For now, return empty so the system uses the hardcoded fallback in the routes
  return ''
}

