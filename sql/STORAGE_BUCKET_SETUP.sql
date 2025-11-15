-- ============================================================================
-- STORAGE BUCKET SETUP SCRIPT
-- ============================================================================
-- This script sets up the storage bucket policies for image uploads.
-- 
-- IMPORTANT: Before running this script, you must create the storage bucket
-- manually through the Supabase Dashboard.
-- ============================================================================

-- ============================================================================
-- STEP 1: CREATE THE STORAGE BUCKET MANUALLY
-- ============================================================================
-- 1. Go to your Supabase Dashboard
-- 2. Navigate to: Storage → Buckets
-- 3. Click "New bucket"
-- 4. Bucket name: order-images
-- 5. Set as: Public (so images can be accessed via URL)
-- 6. Click "Create bucket"

-- ============================================================================
-- STEP 2: RUN THE FOLLOWING SQL IN SQL EDITOR
-- ============================================================================

-- Allow anonymous uploads to the order-images bucket
CREATE POLICY "Allow anonymous uploads"
ON storage.objects FOR INSERT
TO anon
WITH CHECK (bucket_id = 'order-images');

-- Allow anonymous reads (public access to images)
CREATE POLICY "Allow anonymous reads"
ON storage.objects FOR SELECT
TO anon
USING (bucket_id = 'order-images');

-- Allow anonymous deletes (optional, for cleanup)
CREATE POLICY "Allow anonymous deletes"
ON storage.objects FOR DELETE
TO anon
USING (bucket_id = 'order-images');

-- Allow anonymous updates (optional, for replacing images)
CREATE POLICY "Allow anonymous updates"
ON storage.objects FOR UPDATE
TO anon
USING (bucket_id = 'order-images')
WITH CHECK (bucket_id = 'order-images');

-- ============================================================================
-- VERIFICATION
-- ============================================================================
-- After running this script, verify the policies were created:

SELECT 
  policyname, 
  cmd, 
  qual::text as using_expression
FROM pg_policies 
WHERE schemaname = 'storage' 
  AND tablename = 'objects'
  AND policyname LIKE '%order-images%';

-- You should see 4 policies listed:
-- 1. Allow anonymous uploads (INSERT)
-- 2. Allow anonymous reads (SELECT)
-- 3. Allow anonymous deletes (DELETE)
-- 4. Allow anonymous updates (UPDATE)

-- ============================================================================
-- TESTING
-- ============================================================================
-- To test the storage bucket:
-- 1. Use the booking form to upload an image
-- 2. Check that the image appears in: Storage → order-images → bookings/temp/
-- 3. Copy the public URL and verify it loads in a browser
-- 4. Check that the URL is saved in the bookings.images array

-- ============================================================================
-- STORAGE BUCKET STRUCTURE
-- ============================================================================
-- Files will be stored in the following structure:
-- 
-- order-images/
-- └── bookings/
--     └── temp/
--         └── {uuid}_{originalFilename}
--
-- Example:
-- order-images/bookings/temp/123e4567-e89b-12d3-a456-426614174000_gym-photo.jpg

-- ============================================================================
-- CLEANUP (Optional)
-- ============================================================================
-- To clean up old temp images that were never used (abandoned bookings):
-- You can set up a periodic cleanup job or run this manually:

-- List files older than 7 days in temp folder:
-- (This must be done through Supabase API or dashboard, not SQL)

-- ============================================================================
-- SECURITY NOTES
-- ============================================================================
-- - The bucket is set to PUBLIC for easy image access
-- - Anonymous users can upload (needed for booking form)
-- - Consider adding file size limits in your application code
-- - Consider adding file type validation (only images)
-- - Consider rate limiting uploads to prevent abuse
-- - Production recommendation: Move to authenticated uploads with signed URLs

-- ============================================================================
-- TROUBLESHOOTING
-- ============================================================================
-- 
-- Issue: "Policy does not allow operation"
-- Solution: Make sure the bucket is set to PUBLIC and policies are created
--
-- Issue: "Bucket does not exist"
-- Solution: Create the bucket manually first (see Step 1 above)
--
-- Issue: "Images not loading"
-- Solution: Check bucket is PUBLIC and the file path is correct
--
-- ============================================================================

