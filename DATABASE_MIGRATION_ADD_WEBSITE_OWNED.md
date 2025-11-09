# Database Migration: Add Website Owned Column

This migration adds a `website_owned` column to the `bookings` table to track customers who have purchased their website outright.

## Run This SQL in Supabase

1. Go to your Supabase project
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy and paste the following SQL:

```sql
-- Add website_owned column to bookings table
ALTER TABLE public.bookings 
ADD COLUMN IF NOT EXISTS website_owned BOOLEAN DEFAULT FALSE;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_bookings_website_owned 
ON public.bookings(website_owned);

-- Add comment for documentation
COMMENT ON COLUMN public.bookings.website_owned IS 'Indicates if customer has purchased website outright for £299';
```

5. Click **Run** to execute the SQL

## What This Does

- Adds a `website_owned` boolean field (default: `false`)
- Tracks customers who have bought out their website for £299
- When `true`, indicates no subscription is needed - keep hosting live
- Displayed in the admin dashboard with a special badge

## Verification

After running the migration:

```sql
-- Check that the column exists
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'bookings' 
AND column_name = 'website_owned';
```

## For Testing

To manually set a customer as having purchased their website:

```sql
-- Update a specific customer
UPDATE bookings 
SET website_owned = TRUE
WHERE email = 'customer@example.com';
```

## How It Works

1. Customer purchases website through Stripe payment link (£299)
2. Stripe webhook receives `checkout.session.completed` event
3. Webhook identifies it as a website buyout (by price or metadata)
4. Sets `website_owned = TRUE` for that customer's booking
5. Admin dashboard shows "WEBSITE OWNED" badge
6. You know to keep their hosting live without requiring subscription

## Rollback (if needed)

```sql
-- Remove the column (use with caution!)
ALTER TABLE public.bookings 
DROP COLUMN IF EXISTS website_owned;

-- Remove the index
DROP INDEX IF EXISTS idx_bookings_website_owned;
```

