# Database Migration: Add Subscription Password

This migration adds a `subscription_password` column to the `bookings` table for secure subscription management portal access.

## Run This SQL in Supabase

1. Go to your Supabase project
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy and paste the following SQL:

```sql
-- Add subscription_password column to bookings table
ALTER TABLE public.bookings 
ADD COLUMN IF NOT EXISTS subscription_password TEXT;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_bookings_subscription_password 
ON public.bookings(subscription_password);

-- Add comment for documentation
COMMENT ON COLUMN public.bookings.subscription_password IS 'Unique password for customers to access subscription management portal';
```

5. Click **Run** to execute the SQL

## What This Does

- Adds a `subscription_password` field to store unique access codes
- Each customer gets a unique password like `HL6-3PD-L9`
- Required along with email to access the Stripe Customer Portal
- Prevents unauthorized access to subscription management

## Verification

After running the migration:

```sql
-- Check that the column exists
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'bookings' 
AND column_name = 'subscription_password';
```

## For Existing Customers

For customers who already have subscriptions but no password:

```sql
-- Generate passwords for existing customers (run once)
-- This will set a temporary password that you can send to them
UPDATE bookings 
SET subscription_password = UPPER(
  SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 3) || '-' ||
  SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 3) || '-' ||
  SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 2)
)
WHERE subscription_password IS NULL 
AND payment_status = 'completed';
```

## Rollback (if needed)

```sql
-- Remove the column (use with caution!)
ALTER TABLE public.bookings 
DROP COLUMN IF EXISTS subscription_password;

-- Remove the index
DROP INDEX IF EXISTS idx_bookings_subscription_password;
```


