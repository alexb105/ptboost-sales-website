import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export interface TemplateVariables {
  [key: string]: string | undefined
}

/**
 * Fetch an email template from the database
 */
export async function getEmailTemplate(templateKey: string) {
  try {
    const { data, error } = await supabase
      .from('email_templates')
      .select('*')
      .eq('template_key', templateKey)
      .single()

    if (error) {
      console.error(`Error fetching template ${templateKey}:`, error)
      return null
    }

    return data
  } catch (error) {
    console.error(`Error fetching template ${templateKey}:`, error)
    return null
  }
}

/**
 * Replace template variables in a string
 * Variables are in the format {variableName}
 */
export function replaceTemplateVariables(
  template: string,
  variables: TemplateVariables
): string {
  let result = template

  // Replace all {variable} patterns
  Object.keys(variables).forEach((key) => {
    const value = variables[key] || ''
    const regex = new RegExp(`\\{${key}\\}`, 'g')
    result = result.replace(regex, value)
  })

  return result
}

/**
 * Get and render an email template with variables replaced
 */
export async function renderEmailTemplate(
  templateKey: string,
  variables: TemplateVariables
): Promise<{ subject: string; html: string } | null> {
  const template = await getEmailTemplate(templateKey)

  if (!template) {
    console.warn(`Template ${templateKey} not found, returning null`)
    return null
  }

  const subject = replaceTemplateVariables(template.subject, variables)
  const html = replaceTemplateVariables(template.html_content, variables)

  return { subject, html }
}

