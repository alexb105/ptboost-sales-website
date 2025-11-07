# Supabase Bookings Table Setup

This document explains how to set up the `bookings` table in Supabase to store customer booking data.

## Overview

The booking system stores customer information in Supabase before redirecting to the Stripe payment link. After successful payment, the success page retrieves the booking data and sends the email notification.

## Create the Bookings Table

### Option 1: SQL Editor (Recommended)

1. Go to your Supabase project
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy and paste the following SQL:

```sql
-- Create bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  
  -- Personal Information
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  
  -- Business Information
  business_name TEXT NOT NULL,
  location TEXT NOT NULL,
  specialization TEXT NOT NULL,
  
  -- Website Preferences
  preferred_colors TEXT,
  website_goals TEXT,
  additional_notes TEXT,
  
  -- Payment Status
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed')),
  stripe_session_id TEXT,
  
  -- Email Tracking
  email_sent BOOLEAN DEFAULT FALSE
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_bookings_email ON public.bookings(email);
CREATE INDEX IF NOT EXISTS idx_bookings_payment_status ON public.bookings(payment_status);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON public.bookings(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts (for the booking form)
CREATE POLICY "Allow anonymous inserts" ON public.bookings
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow reads (for completing bookings)
CREATE POLICY "Allow anonymous reads" ON public.bookings
  FOR SELECT
  TO anon
  USING (true);

-- Create policy to allow updates (for marking as completed)
CREATE POLICY "Allow anonymous updates" ON public.bookings
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Optional: Create function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update updated_at
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
```

5. Click **Run** to execute the SQL

### Option 2: Table Editor (Manual)

1. Go to **Table Editor** in the left sidebar
2. Click **Create a new table**
3. Name it `bookings`
4. Add the following columns:

| Column Name | Type | Default Value | Options |
|------------|------|---------------|---------|
| id | uuid | gen_random_uuid() | Primary Key |
| created_at | timestamptz | now() | - |
| updated_at | timestamptz | now() | - |
| full_name | text | - | Required |
| email | text | - | Required |
| phone | text | - | Required |
| business_name | text | - | Required |
| location | text | - | Required |
| specialization | text | - | Required |
| preferred_colors | text | - | Optional |
| website_goals | text | - | Optional |
| additional_notes | text | - | Optional |
| payment_status | text | 'pending' | - |
| stripe_session_id | text | - | Optional |
| email_sent | bool | false | - |

5. Enable **Row Level Security (RLS)**
6. Add the policies manually (see SQL above)

## Verify the Table

After creating the table:

1. Go to **Table Editor**
2. You should see the `bookings` table listed
3. Click on it to view the structure
4. Check that RLS is enabled

## Row Level Security (RLS) Policies

The table has three policies:

1. **Allow anonymous inserts**: Allows the booking form to save data
2. **Allow anonymous reads**: Allows the success page to retrieve booking data
3. **Allow anonymous updates**: Allows marking bookings as completed and email sent

**Note**: These policies allow anonymous access because:
- The booking form runs on the client side
- Users need to submit data before authentication
- No sensitive payment data is stored (handled by Stripe)

For production, you may want to add additional security measures like:
- Rate limiting
- Captcha verification
- Server-side validation

## View Bookings Data

### In Supabase Dashboard

1. Go to **Table Editor**
2. Select the `bookings` table
3. View all submitted bookings with their status

### Query Examples

View all pending bookings:
```sql
SELECT * FROM bookings 
WHERE payment_status = 'pending' 
ORDER BY created_at DESC;
```

View completed bookings:
```sql
SELECT * FROM bookings 
WHERE payment_status = 'completed' 
ORDER BY created_at DESC;
```

View bookings where email wasn't sent:
```sql
SELECT * FROM bookings 
WHERE payment_status = 'completed' 
AND email_sent = false;
```

## Data Flow

1. **User fills form** → Data saved to `bookings` table with `payment_status = 'pending'`
2. **User redirects to Stripe** → Payment is processed
3. **User returns to success page** → Booking retrieved by ID
4. **Success page calls API** → Updates `payment_status = 'completed'` and sends email
5. **Email sent** → Sets `email_sent = true`

## Maintenance

### Clean Up Old Pending Bookings

Users who abandon the checkout will have pending bookings. You can clean these up periodically:

```sql
-- Delete pending bookings older than 24 hours
DELETE FROM bookings 
WHERE payment_status = 'pending' 
AND created_at < NOW() - INTERVAL '24 hours';
```

### Backup Data

It's recommended to:
1. Export bookings data regularly
2. Set up automated backups in Supabase
3. Monitor for failed email sends

### Monitor Failed Payments

```sql
-- Find bookings that may have payment issues
SELECT * FROM bookings 
WHERE payment_status = 'pending' 
AND created_at < NOW() - INTERVAL '1 hour'
ORDER BY created_at DESC;
```

## Troubleshooting

### Can't Insert Data

**Issue**: API returns error when saving booking

**Solutions**:
1. Check RLS policies are configured correctly
2. Verify anon key has insert permissions
3. Check Supabase credentials in `.env.local`
4. View logs in Supabase Dashboard → Logs

### Can't Retrieve Booking After Payment

**Issue**: Success page can't find the booking

**Solutions**:
1. Check localStorage for `pending_booking_id`
2. Verify the booking exists in Supabase
3. Check RLS policies allow reads
4. Look at browser console for errors

### Email Not Sending

**Issue**: Booking marked completed but no email

**Solutions**:
1. Check Resend API key is correct
2. Verify `email_sent = false` in the booking record
3. Check API logs for errors
4. Manually trigger email by calling `/api/complete-booking` with booking ID

## Security Considerations

### Current Setup (Development)

- Anonymous users can insert/read/update bookings
- Suitable for development and testing
- Simple and works without authentication

### Production Recommendations

1. **Add Server-Side Validation**
```typescript
// Validate email format, phone format, etc.
```

2. **Implement Rate Limiting**
```typescript
// Limit requests per IP address
```

3. **Add CAPTCHA**
```typescript
// Prevent bot submissions
```

4. **Consider Authentication**
```typescript
// Require users to sign up before booking
```

5. **Encrypt Sensitive Data**
```sql
-- Use Supabase's encryption features for phone numbers
```

6. **Set up Monitoring**
- Alert on suspicious activity
- Monitor failed payments
- Track email delivery rates

## Additional Features

### Admin Dashboard

You can build an admin dashboard to:
- View all bookings
- Filter by status
- Resend emails
- Mark bookings as completed manually
- Export data to CSV

### Email Reminders

Set up automated emails for:
- Abandoned checkouts
- Payment confirmation
- Project updates
- Delivery notifications

### Analytics

Track metrics like:
- Conversion rate (form filled → payment completed)
- Average form completion time
- Most common abandonment points
- Popular specializations/locations

