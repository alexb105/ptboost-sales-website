-- Manual update to mark your booking as website_owned
-- Run this in Supabase SQL Editor for testing

-- Update your booking to test the feature
UPDATE bookings 
SET website_owned = TRUE
WHERE email = 'alexanderbonnici214@gmail.com';

-- Verify the update
SELECT id, email, full_name, business_name, payment_status, website_owned 
FROM bookings 
WHERE email = 'alexanderbonnici214@gmail.com';

