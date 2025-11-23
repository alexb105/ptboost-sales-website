-- Add admin_dashboard_url and visit_website_url columns to bookings table
-- These columns will store custom URLs for admin dashboard and website access

-- Add the columns
ALTER TABLE public.bookings 
ADD COLUMN IF NOT EXISTS admin_dashboard_url TEXT,
ADD COLUMN IF NOT EXISTS visit_website_url TEXT;

-- Add column comments for documentation
COMMENT ON COLUMN public.bookings.admin_dashboard_url IS 'Custom URL for admin dashboard access. Can be edited by clicking and holding the admin dashboard button.';
COMMENT ON COLUMN public.bookings.visit_website_url IS 'Custom URL for website access. Can be edited by clicking and holding the visit website button.';

