-- Create promo_settings table for storing promotional email settings
-- This allows the admin to save promo code and percentage off values
-- so they don't need to re-enter them each time

-- Create promo_settings table
CREATE TABLE IF NOT EXISTS public.promo_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  promo_code TEXT NOT NULL,
  percentage_off TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_promo_settings_created_at ON public.promo_settings(created_at DESC);

-- Add RLS (Row Level Security) policies
ALTER TABLE public.promo_settings ENABLE ROW LEVEL SECURITY;

-- Allow service role to read/write (for API access)
CREATE POLICY "Service role can manage promo settings"
  ON public.promo_settings
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to read (if needed)
CREATE POLICY "Authenticated users can read promo settings"
  ON public.promo_settings
  FOR SELECT
  USING (true);

-- Add comment to table
COMMENT ON TABLE public.promo_settings IS 'Stores promotional email settings (promo code and percentage off) for reuse in admin panel';

