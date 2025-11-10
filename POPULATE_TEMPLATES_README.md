# Populate Email Templates

This script populates the `email_templates` table in Supabase with the hardcoded HTML content from the email route files.

## Prerequisites

1. Make sure you have the following environment variables set:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY` (preferred) or `NEXT_PUBLIC_SUPABASE_ANON_KEY`

2. The `email_templates` table must already exist (run `EMAIL_TEMPLATES_SETUP.sql` first)

## Usage

Run the script from the project root:

```bash
node scripts/populate-email-templates.js
```

Or with environment variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_url SUPABASE_SERVICE_ROLE_KEY=your_key node scripts/populate-email-templates.js
```

## What it does

1. Reads the hardcoded HTML from each email route file
2. Converts JavaScript template literals (e.g., `${bookingData.fullName}`) to template variable format (e.g., `{fullName}`)
3. Handles conditional expressions (e.g., `${bookingData.preferredColors ? ... : ''}`) and converts them to `{if_preferredColors}...{/if_preferredColors}`
4. Updates the `html_content` field in the `email_templates` table for each template

## Templates Updated

- `customer_booking_confirmation` - From `app/api/send-booking-email/route.ts`
- `developer_new_booking` - From `app/api/send-booking-email/route.ts`
- `customer_pending_followup` - From `app/api/send-pending-followup/route.ts`
- `customer_waiting_list_notification` - From `app/api/notify-waiting-list/route.ts`
- `customer_waiting_list_confirmation` - From `app/api/notify/route.ts`
- `developer_waiting_list_signup` - From `app/api/notify/route.ts`

## Notes

- The script preserves the original HTML structure and styling
- Template variables are converted to the format used by the `replaceTemplateVariables` function
- Special variables like `{siteUrl}` are automatically handled
- Conditional blocks are converted to `{if_variable}...{/if_variable}` format

