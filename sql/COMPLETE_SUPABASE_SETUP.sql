-- ============================================================================
-- COMPLETE SUPABASE DATABASE SETUP SCRIPT
-- ============================================================================
-- This script sets up all tables, policies, indexes, and functions needed
-- for the PTBoost main website project.
--
-- RUN THIS IN YOUR SUPABASE SQL EDITOR
-- ============================================================================

-- ============================================================================
-- 1. CAPACITY STATUS TABLE
-- ============================================================================
-- Stores the current capacity count (spots remaining)

CREATE TABLE IF NOT EXISTS capacity_status (
  id INTEGER PRIMARY KEY DEFAULT 1,
  capacity_count INTEGER NOT NULL DEFAULT 5,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT single_row CHECK (id = 1)
);

-- Insert the initial record (starts with 5 spots available)
INSERT INTO capacity_status (id, capacity_count, updated_at)
VALUES (1, 5, NOW())
ON CONFLICT (id) DO NOTHING;

-- Enable Row Level Security (RLS)
ALTER TABLE capacity_status ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow anyone to read
CREATE POLICY "Allow public read access" ON capacity_status
  FOR SELECT TO public
  USING (true);

-- Create a policy to allow updates (handled in the API)
CREATE POLICY "Allow authenticated updates" ON capacity_status
  FOR UPDATE TO public
  USING (true)
  WITH CHECK (true);

-- ============================================================================
-- 2. WAITING LIST TABLE
-- ============================================================================
-- Stores email addresses of people who want to be notified when spots open up

CREATE TABLE IF NOT EXISTS public.waiting_list (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE
);

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_waiting_list_email ON public.waiting_list(email);
CREATE INDEX IF NOT EXISTS idx_waiting_list_created_at ON public.waiting_list(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.waiting_list ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts (for the notify form)
CREATE POLICY "Allow anonymous inserts" ON public.waiting_list
  FOR INSERT TO anon
  WITH CHECK (true);

-- Create policy to allow reads (for admin dashboard)
CREATE POLICY "Allow anonymous reads" ON public.waiting_list
  FOR SELECT TO anon
  USING (true);

-- Allow deletes (for admin management)
CREATE POLICY "Allow anonymous deletes" ON public.waiting_list
  FOR DELETE TO anon
  USING (true);

-- ============================================================================
-- 3. BOOKINGS TABLE
-- ============================================================================
-- Stores customer booking data, payment info, and subscription status

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
  
  -- Image Uploads
  images TEXT[] DEFAULT '{}',
  
  -- Payment Status
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed')),
  stripe_session_id TEXT,
  stripe_customer_id TEXT,
  
  -- Email Tracking
  email_sent BOOLEAN DEFAULT FALSE,
  
  -- Subscription Management
  subscribed BOOLEAN DEFAULT FALSE,
  subscription_end_date TIMESTAMPTZ DEFAULT NULL,
  subscription_password TEXT,
  
  -- Website Ownership
  website_owned BOOLEAN DEFAULT FALSE
);

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_bookings_email ON public.bookings(email);
CREATE INDEX IF NOT EXISTS idx_bookings_payment_status ON public.bookings(payment_status);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON public.bookings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bookings_stripe_customer_id ON public.bookings(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_bookings_subscription_password ON public.bookings(subscription_password);
CREATE INDEX IF NOT EXISTS idx_bookings_website_owned ON public.bookings(website_owned);
CREATE INDEX IF NOT EXISTS idx_bookings_subscribed ON public.bookings(subscribed);
CREATE INDEX IF NOT EXISTS idx_bookings_email_subscribed ON public.bookings(email, subscribed);

-- Create partial indexes for specific queries
CREATE INDEX IF NOT EXISTS idx_bookings_subscription_end_date 
  ON public.bookings(subscription_end_date) 
  WHERE subscription_end_date IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_bookings_expiring_soon 
  ON public.bookings(subscribed, subscription_end_date) 
  WHERE subscribed = false AND subscription_end_date IS NOT NULL;

-- Add column comments for documentation
COMMENT ON COLUMN public.bookings.images IS 'Array of image URLs uploaded by the customer during booking';
COMMENT ON COLUMN public.bookings.stripe_customer_id IS 'Stripe customer ID for subscription management via Customer Portal';
COMMENT ON COLUMN public.bookings.subscription_password IS 'Unique password for customers to access subscription management portal';
COMMENT ON COLUMN public.bookings.website_owned IS 'Indicates if customer has purchased website outright for £299';
COMMENT ON COLUMN public.bookings.subscribed IS 'Current subscription status (true = active subscription)';
COMMENT ON COLUMN public.bookings.subscription_end_date IS 'The date when the subscription will end (for canceled subscriptions that run until period end)';

-- Enable Row Level Security
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts (for the booking form)
CREATE POLICY "Allow anonymous inserts" ON public.bookings
  FOR INSERT TO anon
  WITH CHECK (true);

-- Create policy to allow reads (for completing bookings)
CREATE POLICY "Allow anonymous reads" ON public.bookings
  FOR SELECT TO anon
  USING (true);

-- Create policy to allow updates (for marking as completed)
CREATE POLICY "Allow anonymous updates" ON public.bookings
  FOR UPDATE TO anon
  USING (true)
  WITH CHECK (true);

-- Create policy to allow deletes (for admin management)
CREATE POLICY "Allow anonymous deletes" ON public.bookings
  FOR DELETE TO anon
  USING (true);

-- Create function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update updated_at
DROP TRIGGER IF EXISTS set_updated_at ON public.bookings;
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================================
-- 4. PROMO SETTINGS TABLE
-- ============================================================================
-- Stores promotional email settings (promo code and percentage off values)

CREATE TABLE IF NOT EXISTS public.promo_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  promo_code TEXT NOT NULL,
  percentage_off TEXT NOT NULL,
  months TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_promo_settings_created_at ON public.promo_settings(created_at DESC);

-- Add column comments
COMMENT ON TABLE public.promo_settings IS 'Stores promotional email settings (promo code and percentage off) for reuse in admin panel';
COMMENT ON COLUMN public.promo_settings.months IS 'Number of months the promotional offer applies for';

-- Enable Row Level Security (RLS)
ALTER TABLE public.promo_settings ENABLE ROW LEVEL SECURITY;

-- Allow service role to read/write (for API access)
CREATE POLICY "Service role can manage promo settings" ON public.promo_settings
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to read (if needed)
CREATE POLICY "Authenticated users can read promo settings" ON public.promo_settings
  FOR SELECT
  USING (true);

-- ============================================================================
-- 5. PAYMENT LINKS TABLE
-- ============================================================================
-- Stores Stripe payment links for subscription and website buyout

CREATE TABLE IF NOT EXISTS payment_links (
  id INTEGER PRIMARY KEY DEFAULT 1,
  subscription_link TEXT,
  resubscription_link TEXT,
  buyout_link TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT single_row CHECK (id = 1)
);

-- Insert the initial record with placeholder links
-- IMPORTANT: Replace these with your actual Stripe payment links
INSERT INTO payment_links (id, subscription_link, resubscription_link, buyout_link, updated_at)
VALUES (
  1, 
  'https://buy.stripe.com/eVqbJ2gwy49t5RL3RR0co03',  -- Replace with your subscription link (with free trial)
  'https://buy.stripe.com/your-resubscription-link',  -- Replace with your resubscription link (no trial)
  'https://buy.stripe.com/14AdRafsueO70xr3RR0co05',  -- Replace with your buyout link
  NOW()
)
ON CONFLICT (id) DO NOTHING;

-- Enable Row Level Security (RLS)
ALTER TABLE payment_links ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow anyone to read
CREATE POLICY "Allow public read access" ON payment_links
  FOR SELECT TO public
  USING (true);

-- Create a policy to allow updates (handled in the API)
CREATE POLICY "Allow authenticated updates" ON payment_links
  FOR UPDATE TO public
  USING (true)
  WITH CHECK (true);

-- Add comment for documentation
COMMENT ON COLUMN payment_links.subscription_link IS 'Stripe payment link for first-time subscribers (includes free trial)';
COMMENT ON COLUMN payment_links.resubscription_link IS 'Stripe payment link for re-subscribing users (no free trial)';
COMMENT ON COLUMN payment_links.buyout_link IS 'Stripe payment link for one-time website purchase (£299)';

-- ============================================================================
-- SETUP COMPLETE!
-- ============================================================================
-- 
-- Next steps:
-- 1. Set up Storage Bucket (see STORAGE_BUCKET_SETUP.sql)
-- 2. Update payment links in the payment_links table with your actual Stripe links
-- 3. Configure environment variables in your application
-- 4. Test the setup by creating a test booking
--
-- ============================================================================

