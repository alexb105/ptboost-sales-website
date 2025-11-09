# Database Migration: Add Images Column to Bookings Table

This migration adds an `images` column to the `bookings` table to store uploaded image URLs.

## SQL Migration

Run this SQL in your Supabase SQL Editor:

```sql
-- Add images column to bookings table
ALTER TABLE public.bookings 
ADD COLUMN IF NOT EXISTS images TEXT[] DEFAULT '{}';

-- Add comment to document the column
COMMENT ON COLUMN public.bookings.images IS 'Array of image URLs uploaded by the customer during booking';
```

## Supabase Storage Setup

You also need to create a storage bucket for booking images:

1. Go to **Storage** in your Supabase dashboard
2. Click **New bucket**
3. Name it `order-images`
4. Set it to **Public** (so images can be accessed via URL)
5. Click **Create bucket**

### Storage Bucket Policies

After creating the bucket, set up the following policies in **Storage** → **Policies**:

```sql
-- Allow anonymous uploads
CREATE POLICY "Allow anonymous uploads"
ON storage.objects FOR INSERT
TO anon
WITH CHECK (bucket_id = 'order-images');

-- Allow anonymous reads (public access)
CREATE POLICY "Allow anonymous reads"
ON storage.objects FOR SELECT
TO anon
USING (bucket_id = 'order-images');

-- Allow anonymous deletes (optional, for cleanup)
CREATE POLICY "Allow anonymous deletes"
ON storage.objects FOR DELETE
TO anon
USING (bucket_id = 'order-images');
```

## Verification

After running the migration:

1. Check that the `images` column exists in the `bookings` table
2. Verify the storage bucket `order-images` exists and is public
3. Test uploading an image through the booking form

