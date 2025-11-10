# Email Templates System

This system allows you to edit email templates sent to customers and developers through the admin dashboard at `/ptdash2025`.

## Setup

1. **Run the SQL migration** to create the email templates table:
   ```sql
   -- Run EMAIL_TEMPLATES_SETUP.sql in your Supabase SQL editor
   ```

2. **Populate templates** (optional):
   - Templates start with empty HTML content
   - You can copy the existing HTML from the email routes into the database through the admin UI
   - Or leave them empty and the system will fall back to hardcoded templates

## Usage

1. **Access the Email Templates tab**:
   - Go to `/ptdash2025`
   - Click on the "Email Templates" tab
   - You'll see two sections:
     - **Customer Email Templates**: Templates sent to customers
     - **Developer Email Templates**: Templates sent to developers/administrators

2. **Edit a template**:
   - Click the "Edit" button on any template
   - Modify the subject and HTML content
   - Click "Save Template" to save your changes

## Available Templates

### Customer Templates

- **customer_booking_confirmation**: Sent when payment is completed
- **customer_waiting_list_notification**: Sent when spots open up
- **customer_pending_followup**: Sent to customers with pending orders
- **customer_waiting_list_confirmation**: Sent when someone signs up for waiting list

### Developer Templates

- **developer_new_booking**: Sent to developer when a new booking is completed
- **developer_waiting_list_signup**: Sent to developer when someone signs up for waiting list
- **developer_buyout_purchase**: Sent to developer when a buyout purchase is made

## Template Variables

You can use variables in your templates that will be replaced with actual values:

- `{fullName}` - Customer's full name
- `{email}` - Customer's email
- `{phone}` - Customer's phone number
- `{businessName}` - Business name
- `{location}` - Location
- `{specialization}` - Specialization
- `{preferredColors}` - Preferred colors
- `{websiteGoals}` - Website goals
- `{additionalNotes}` - Additional notes
- `{subscriptionPassword}` - Subscription password
- `{sessionId}` - Stripe session ID

## How It Works

1. When an email needs to be sent, the system first checks if a template exists in the database
2. If a template exists and has HTML content, it uses that template
3. If no template exists or the HTML is empty, it falls back to the hardcoded template in the code
4. Variables in the template are replaced with actual values before sending

## Notes

- Templates are stored in Supabase `email_templates` table
- Changes take effect immediately after saving
- The system gracefully falls back to hardcoded templates if database templates are unavailable
- All templates support HTML formatting

