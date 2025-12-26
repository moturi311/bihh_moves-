-- =====================================================
-- Supabase Storage Setup for Vehicle Images
-- Run this in Supabase Dashboard → Storage
-- =====================================================

-- 1. Create a storage bucket for vehicle images
-- Go to: Storage → Create a new bucket
-- Bucket name: vehicle-images
-- Public bucket: YES (so images are publicly accessible)

-- 2. Set up storage policies
-- Go to: Storage → vehicle-images → Policies

-- Policy 1: Allow public read access
CREATE POLICY "Public can view vehicle images"
ON storage.objects FOR SELECT
USING (bucket_id = 'vehicle-images');

-- Policy 2: Allow authenticated users (admins) to upload
CREATE POLICY "Authenticated users can upload vehicle images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'vehicle-images' 
  AND auth.role() = 'authenticated'
);

-- Policy 3: Allow authenticated users (admins) to update
CREATE POLICY "Authenticated users can update vehicle images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'vehicle-images' 
  AND auth.role() = 'authenticated'
);

-- Policy 4: Allow authenticated users (admins) to delete
CREATE POLICY "Authenticated users can delete vehicle images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'vehicle-images' 
  AND auth.role() = 'authenticated'
);

-- =====================================================
-- ALTERNATIVE: Manual Setup via Dashboard
-- =====================================================
-- If you prefer to set up via the dashboard:
-- 
-- 1. Go to Storage in Supabase Dashboard
-- 2. Click "New bucket"
-- 3. Name: vehicle-images
-- 4. Public: ON
-- 5. Click "Create bucket"
-- 
-- 6. Click on the bucket → Policies tab
-- 7. Click "New policy"
-- 8. Use the templates or create custom policies as shown above
