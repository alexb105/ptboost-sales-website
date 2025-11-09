-- Check if images column exists and view sample data
-- Run this in Supabase SQL Editor to diagnose image storage issues

-- 1. Check if images column exists
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name = 'bookings' 
  AND column_name = 'images';

-- 2. View sample bookings with images
SELECT 
    id,
    full_name,
    email,
    payment_status,
    images,
    array_length(images, 1) as image_count,
    created_at
FROM bookings
WHERE payment_status = 'completed'
ORDER BY created_at DESC
LIMIT 10;

-- 3. Check if any bookings have images
SELECT 
    COUNT(*) as total_completed_orders,
    COUNT(CASE WHEN images IS NOT NULL AND array_length(images, 1) > 0 THEN 1 END) as orders_with_images,
    COUNT(CASE WHEN images IS NULL OR array_length(images, 1) = 0 THEN 1 END) as orders_without_images
FROM bookings
WHERE payment_status = 'completed';

