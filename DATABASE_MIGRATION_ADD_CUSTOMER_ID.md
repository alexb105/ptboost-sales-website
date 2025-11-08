# Database Migration: Add Stripe Customer ID

This migration adds a `stripe_customer_id` column to the `bookings` table to enable subscription management via Stripe Customer Portal.

## Run This SQL in Supabase

1. Go to your Supabase project
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy and paste the following SQL:

```sql
-- Add stripe_customer_id column to bookings table
ALTER TABLE public.bookings 
ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT;

-- Create index for faster lookups by customer ID
CREATE INDEX IF NOT EXISTS idx_bookings_stripe_customer_id 
ON public.bookings(stripe_customer_id);

-- Add comment for documentation
COMMENT ON COLUMN public.bookings.stripe_customer_id IS 'Stripe customer ID for subscription management via Customer Portal';
```

5. Click **Run** to execute the SQL

## Verification

After running the migration, verify it worked:

```sql
-- Check that the column exists
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'bookings' 
AND column_name = 'stripe_customer_id';

-- Should return:
-- column_name: stripe_customer_id
-- data_type: text
-- is_nullable: YES
```

## What This Enables

With the `stripe_customer_id` stored in the database:
- Customers can access the Stripe Customer Portal to manage their subscriptions
- They can cancel, pause, or update payment methods themselves
- You don't need to manually manage subscription changes
- The system can look up a customer's subscription using their email

## Rollback (if needed)

If you need to remove this column:

```sql
-- Remove the column (use with caution!)
ALTER TABLE public.bookings 
DROP COLUMN IF EXISTS stripe_customer_id;

-- Remove the index
DROP INDEX IF EXISTS idx_bookings_stripe_customer_id;
```

## Next Steps

After running this migration:
1. Update the webhook to capture and store customer IDs from Stripe
2. Customers will be able to manage their subscriptions via the portal


