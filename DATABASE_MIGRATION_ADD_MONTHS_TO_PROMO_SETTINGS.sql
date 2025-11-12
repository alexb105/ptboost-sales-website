-- Migration: Add months column to promo_settings table
-- This allows the admin to save the months value for promotional offers

-- Add months column to promo_settings table
ALTER TABLE public.promo_settings 
ADD COLUMN IF NOT EXISTS months TEXT;

-- Update the table comment
COMMENT ON COLUMN public.promo_settings.months IS 'Number of months the promotional offer applies for';

