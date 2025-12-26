# Supabase Setup Guide

## Prerequisites
- Supabase account (free tier is fine for development)
- Project created in Supabase Dashboard

## Step 1: Run Database Migrations

1. Go to your Supabase Dashboard
2. Navigate to **SQL Editor**
3. Create a new query
4. Copy and paste the contents of `supabase/migrations/001_initial_schema.sql`
5. Click **Run** to execute
6. Verify tables were created in **Table Editor**

## Step 2: Seed Initial Data

1. In SQL Editor, create another new query
2. Copy and paste the contents of `supabase/migrations/002_seed_vehicles.sql`
3. Click **Run** to execute
4. Verify vehicles were inserted (should show 10 vehicles)

## Step 3: Configure Environment Variables

Your `.env.local` file should already have:
```
VITE_SUPABASE_URL=https://brsjcuibqvvsldrkshtj.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_nIX1MOk-kgvSCEeH-XvSmg_ndx4X0d0
```

If not, add them now with your project's credentials from:
**Supabase Dashboard → Settings → API**

## Step 4: Enable Realtime

1. Go to **Database → Replication**
2. Ensure the following tables have Realtime enabled:
   - ✅ vehicles
   - ✅ bookings
   - ✅ customers
   - ✅ payments
   - ✅ roadtrips
   - ✅ driver_verifications

## Step 5: Test the Application

1. Restart your dev server:
   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   ```

2. Open http://localhost:3000
3. Verify vehicles load from database (should see 10 vehicles)
4. Try filtering by category

## Step 6: Test Admin Panel

1. Go to http://localhost:3000/admin
2. Sign up with a real email (e.g., your Gmail)
3. Navigate to **Fleet** section
4. Try adding a new vehicle
5. Verify it appears on the main site immediately

## Step 7: Test Real-Time Sync

**Two-Browser Test:**
1. Open http://localhost:3000/admin in Browser 1
2. Open http://localhost:3000 in Browser 2
3. In Browser 1 (admin), edit a vehicle's price
4. Watch Browser 2 (user site) update automatically

## Troubleshooting

### Vehicles not loading
- Check browser console for errors
- Verify Supabase URL and Anon Key are correct
- Check RLS policies are set up correctly

### Real-time not working
- Ensure Realtime is enabled on tables
- Check browser console for WebSocket connection errors
- Verify you're on Supabase Pro plan if using many connections

### Authentication issues
- Use a real email address (not test@test.com)
- Check Supabase Auth settings
- Disable email confirmation for testing

## Next Steps

Once basic real-time sync is working:
1. Implement booking creation from user site
2. Set up M-Pesa payment webhooks
3. Add browser notifications for admins
4. Implement driver verification workflow
