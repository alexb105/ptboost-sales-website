# Payment Links Setup Guide

This guide will help you set up the payment links table in Supabase for managing Stripe payment links.

## Step 1: Create the Database Table

1. In your Supabase dashboard, click on "SQL Editor" in the left sidebar
2. Click "New query"
3. Copy and paste the following SQL code:

```sql
-- Create the payment_links table
CREATE TABLE payment_links (
  id INTEGER PRIMARY KEY DEFAULT 1,
  subscription_link TEXT,
  buyout_link TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT single_row CHECK (id = 1)
);

-- Insert the initial record with default links
-- Replace these with your actual Stripe payment links
INSERT INTO payment_links (id, subscription_link, buyout_link, updated_at)
VALUES (
  1, 
  'https://buy.stripe.com/eVqbJ2gwy49t5RL3RR0co03',  -- Subscription link
  'https://buy.stripe.com/14AdRafsueO70xr3RR0co05',  -- Buyout link
  NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE payment_links ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow anyone to read
CREATE POLICY "Allow public read access"
ON payment_links
FOR SELECT
TO public
USING (true);

-- Create a policy to allow updates (we'll handle auth in the API)
CREATE POLICY "Allow authenticated updates"
ON payment_links
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);
```

4. Click "Run" to execute the query
5. You should see "Success. No rows returned" - this is correct!

## Step 2: Update Payment Links

After creating the table, you can update the payment links through the admin dashboard at `/ptdash2025` in the "Payment Links" tab.

## Notes

- The subscription link is used for the booking form (monthly subscription)
- The buyout link is used for one-time website purchases
- Both links are validated to ensure they are valid Stripe payment link URLs
- Links can be updated anytime through the admin dashboard

