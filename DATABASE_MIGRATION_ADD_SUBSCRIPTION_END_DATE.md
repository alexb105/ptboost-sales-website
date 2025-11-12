# Database Migration: Add Subscription End Date

## Overview
This migration adds a `subscription_end_date` column to track when a canceled subscription will actually expire. This allows admins to see how many days remain before they need to deactivate a website.

## Migration SQL

```sql
-- Add subscription_end_date column to bookings table
ALTER TABLE bookings 
ADD COLUMN subscription_end_date TIMESTAMPTZ DEFAULT NULL;

-- Add comment for documentation
COMMENT ON COLUMN bookings.subscription_end_date IS 
'The date when the subscription will end (for canceled subscriptions that run until period end)';

-- Create index for querying soon-to-expire subscriptions
CREATE INDEX idx_bookings_subscription_end_date 
ON bookings(subscription_end_date) 
WHERE subscription_end_date IS NOT NULL;

-- Create index for finding subscriptions that need admin notification
CREATE INDEX idx_bookings_expiring_soon 
ON bookings(subscribed, subscription_end_date) 
WHERE subscribed = false AND subscription_end_date IS NOT NULL;
```

## How to Apply

### Option 1: Supabase Dashboard (Recommended)
1. Go to your Supabase project dashboard
2. Navigate to the **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy and paste the migration SQL above
5. Click **Run** or press `Cmd/Ctrl + Enter`
6. Verify success message appears

### Option 2: Supabase CLI
```bash
# Create a new migration file
supabase migration new add_subscription_end_date

# Add the SQL to the generated file
# Then apply the migration
supabase db push
```

## Column Details

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `subscription_end_date` | `TIMESTAMPTZ` | Yes | `NULL` | Date when canceled subscription expires |

## Usage

### When Subscription is Canceled
```typescript
// Store the subscription's current_period_end
await supabase
  .from('bookings')
  .update({
    subscribed: false,
    subscription_end_date: subscription.current_period_end // Unix timestamp from Stripe
  })
```

### Display Days Remaining
```typescript
const daysRemaining = Math.ceil(
  (new Date(subscription_end_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
)
```

### Find Expiring Subscriptions (for daily checks)
```sql
SELECT * FROM bookings
WHERE subscribed = false 
  AND subscription_end_date IS NOT NULL
  AND subscription_end_date <= NOW();
```

## Indexes Created

1. **`idx_bookings_subscription_end_date`**
   - Speeds up queries for subscriptions with end dates
   - Partial index (only non-NULL values)

2. **`idx_bookings_expiring_soon`**
   - Optimized for finding canceled subscriptions that need notification
   - Used by daily cron job to send admin notifications

## Rollback

If you need to undo this migration:

```sql
-- Remove indexes
DROP INDEX IF EXISTS idx_bookings_expiring_soon;
DROP INDEX IF EXISTS idx_bookings_subscription_end_date;

-- Remove column
ALTER TABLE bookings DROP COLUMN IF EXISTS subscription_end_date;
```

## Verification

After applying the migration, verify it worked:

```sql
-- Check column exists
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'bookings' 
  AND column_name = 'subscription_end_date';

-- Check indexes exist
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'bookings'
  AND indexname IN ('idx_bookings_subscription_end_date', 'idx_bookings_expiring_soon');
```

Expected result:
- Column exists with type `timestamp with time zone`
- Both indexes exist and are active

## Notes

- The column is nullable because active subscriptions don't have an end date
- Only canceled subscriptions (`subscribed = false`) should have this value set
- The timestamp is stored in UTC (Stripe's format)
- When countdown hits 0, admin receives email notification
- This allows subscriptions to run until period end (customer-friendly cancellation)

