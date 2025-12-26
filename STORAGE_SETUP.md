# Quick Supabase Storage Setup

## Create the Storage Bucket

1. **Go to Supabase Dashboard**
   - Visit: https://supabase.com/dashboard
   - Select your project: `brsjcuibqvvsldrkshtj`

2. **Navigate to Storage**
   - Click **Storage** in the left sidebar
   - Click **New bucket** button

3. **Create Bucket**
   - **Name**: `vehicle-images`
   - **Public bucket**: Toggle **ON** ✅
   - Click **Create bucket**

4. **Set Policies** (Important!)
   - Click on the `vehicle-images` bucket
   - Go to **Policies** tab
   - Click **New policy**
   - Select **For full customization** → **Create policy**
   
   **Policy 1: Public Read**
   - Policy name: `Public can view images`
   - Allowed operation: `SELECT`
   - Target roles: `public`
   - USING expression: `bucket_id = 'vehicle-images'`
   - Click **Review** → **Save policy**

   **Policy 2: Authenticated Upload**
   - Click **New policy** again
   - Policy name: `Authenticated can upload`
   - Allowed operation: `INSERT`
   - Target roles: `authenticated`
   - WITH CHECK expression: `bucket_id = 'vehicle-images'`
   - Click **Review** → **Save policy**

   **Policy 3: Authenticated Delete**
   - Click **New policy** again
   - Policy name: `Authenticated can delete`
   - Allowed operation: `DELETE`
   - Target roles: `authenticated`
   - USING expression: `bucket_id = 'vehicle-images'`
   - Click **Review** → **Save policy**

## Test Upload

1. Go to http://localhost:3000/admin
2. Navigate to **Fleet** section
3. Click **Add Vehicle**
4. Drag a JPEG/JPG/PNG image onto the upload area
5. You should see upload progress and the image preview

## Troubleshooting

### "Bucket not found" error
- Make sure you created the bucket named exactly `vehicle-images`
- Ensure it's marked as **Public**
- Check that you're logged into the admin panel

### Upload fails
- Check browser console for specific error
- Verify the bucket policies are set correctly
- Make sure you're authenticated (logged into admin)

### Image doesn't display
- Check if the bucket is set to **Public**
- Verify the image URL in the browser console
- Try accessing the URL directly in a new tab
