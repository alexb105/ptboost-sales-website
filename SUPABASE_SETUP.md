# Supabase Setup Guide

This guide will help you set up Supabase for managing the capacity status of your PT Lead Magnet website.

## Prerequisites

- A Supabase account (free tier works fine) - [Sign up here](https://app.supabase.com)

## Step 1: Create a Supabase Project

1. Go to [app.supabase.com](https://app.supabase.com)
2. Click "New Project"
3. Fill in your project details:
   - **Name**: PT Lead Magnet (or any name you prefer)
   - **Database Password**: Choose a secure password (save this!)
   - **Region**: Choose the closest region to your users
4. Click "Create new project" and wait for it to be ready (takes ~2 minutes)

## Step 2: Create the Database Table

1. In your Supabase dashboard, click on "SQL Editor" in the left sidebar
2. Click "New query"
3. Copy and paste the following SQL code:

```sql
-- Create the capacity_status table
CREATE TABLE capacity_status (
  id INTEGER PRIMARY KEY DEFAULT 1,
  capacity_count INTEGER NOT NULL DEFAULT 5,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT single_row CHECK (id = 1)
);

-- Insert the initial record (starts with 5 spots available)
INSERT INTO capacity_status (id, capacity_count, updated_at)
VALUES (1, 5, NOW());

-- Enable Row Level Security (RLS)
ALTER TABLE capacity_status ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow anyone to read
CREATE POLICY "Allow public read access"
ON capacity_status
FOR SELECT
TO public
USING (true);

-- Create a policy to allow updates (we'll handle auth in the API)
CREATE POLICY "Allow authenticated updates"
ON capacity_status
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);
```

4. Click "Run" to execute the query
5. You should see "Success. No rows returned" - this is correct!

## Step 3: Get Your Supabase Credentials

1. In your Supabase dashboard, click on "Project Settings" (gear icon in the left sidebar)
2. Click on "API" in the settings menu
3. You'll see two important values:
   - **Project URL**: Looks like `https://xxxxxxxxxxxxx.supabase.co`
   - **anon/public key**: A long string starting with `eyJ...`

## Step 4: Configure Environment Variables

1. In your project root, create a `.env.local` file (or rename `.env.example`)
2. Add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxxxxxxxxxxxxxxxxxxxx
ADMIN_PASSWORD=your_secure_admin_password
RESEND_API_KEY=your_resend_api_key
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
```

3. Replace the placeholder values with your actual credentials
4. Set a strong password for `ADMIN_PASSWORD` - this protects your `/admin` route

## Step 5: Verify the Setup

1. Start your development server:
   ```bash
   pnpm dev
   ```

2. Visit `http://localhost:3000` - the website should load without errors

3. Visit `http://localhost:3000/admin` - you should see the admin login page

4. Log in with the password you set in `ADMIN_PASSWORD`

5. Set the capacity count (e.g., 5 spots) - it should update immediately

6. Go back to the main page and refresh - you should see the spot counter

7. To test automatic decrement:
   - Use Stripe CLI: `stripe listen --forward-to localhost:3000/api/stripe-webhook`
   - Make a test purchase
   - Check that capacity decreased by 1

## Step 6: Configure Stripe Webhook (Important!)

For the capacity to automatically decrement with each purchase, you need to set up a Stripe webhook:

1. Go to your [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
2. Click "Add endpoint"
3. Enter your webhook URL:
   - Development: Use [Stripe CLI](https://stripe.com/docs/stripe-cli) for local testing
   - Production: `https://yourdomain.com/api/stripe-webhook`
4. Select event to listen to: `checkout.session.completed`
5. Copy the "Signing secret" (starts with `whsec_`)
6. Add it to your `.env.local` as `STRIPE_WEBHOOK_SECRET`

**Important**: Also add your Stripe secret key:
- Get it from Stripe Dashboard → Developers → API keys
- Add as `STRIPE_SECRET_KEY` in `.env.local`

## Database Schema

The `capacity_status` table has the following structure:

| Column          | Type        | Description                                    |
|-----------------|-------------|------------------------------------------------|
| id              | INTEGER     | Primary key (always 1, single row constraint) |
| capacity_count  | INTEGER     | Number of available spots                      |
| updated_at      | TIMESTAMPTZ | When the status was last updated               |

## Security Notes

- The `NEXT_PUBLIC_*` environment variables are safe to expose to the client
- The `ADMIN_PASSWORD` is kept server-side and never exposed to the client
- Row Level Security (RLS) is enabled on the table
- The admin API endpoint validates the password before allowing updates
- Public users can only read the capacity status, not update it

## Troubleshooting

### "Failed to fetch capacity status"
- Check that your Supabase project is running (not paused)
- Verify your environment variables are correct
- Check the browser console for detailed error messages

### Can't log in to admin panel
- Verify `ADMIN_PASSWORD` is set in your `.env.local` file
- Make sure you restart your dev server after changing environment variables

### Changes not appearing on the website
- Clear your browser cache
- Check the Network tab in browser dev tools to see if the API call is successful
- Verify the database was updated by checking in Supabase dashboard → Table Editor

## How It Works

### User Flow
1. Visitor sees capacity counter on the main page (e.g., "5 Spots Remaining")
2. They click the CTA button and complete checkout via Stripe
3. Stripe sends a webhook to your site after successful payment
4. Your site automatically decrements capacity by 1
5. When capacity hits 0, the button is disabled and "Get Notified" form appears

### Admin Flow
1. Log in to `/admin` with your admin password
2. Set or reset the capacity count (manual entry or quick presets)
3. Changes appear instantly on the live site
4. Monitor current status and last update time

## Need Help?

If you encounter any issues:
1. Check the browser console for errors
2. Check your server logs (terminal where `pnpm dev` is running)
3. Verify your Supabase project is active and not paused
4. Double-check all environment variables are set correctly
5. For Stripe webhook issues:
   - Check webhook logs in Stripe Dashboard
   - Verify the signing secret matches
   - Ensure the endpoint is publicly accessible (in production)

## Deployment Notes

When deploying to production (Vercel, Netlify, etc.):
1. Add all environment variables to your hosting platform's environment settings
2. Make sure to use the same Supabase project (or create a separate production project)
3. Never commit `.env.local` or `.env` files to Git (they're in `.gitignore`)
4. **Important**: Set up the Stripe webhook with your production URL
5. Use production Stripe keys (not test keys) in production environment

