-- Verify images exist in storage bucket
-- Run this to check if the image files actually exist in Supabase Storage

-- First, get the image URLs from bookings
SELECT 
    id,
    full_name,
    email,
    images,
    array_length(images, 1) as image_count
FROM bookings
WHERE payment_status = 'completed'
  AND images IS NOT NULL
  AND array_length(images, 1) > 0
ORDER BY created_at DESC
LIMIT 5;

-- To manually verify an image URL:
-- 1. Copy one of the URLs from the images array above
-- 2. Open it in a new browser tab
-- 3. If it loads, the file exists. If you get a 404 or access error, the file doesn't exist or isn't accessible.

-- To check files in the storage bucket directly:
-- Go to Supabase Dashboard → Storage → Files → order-images bucket
-- Look for files in the "bookings/temp/" folder

