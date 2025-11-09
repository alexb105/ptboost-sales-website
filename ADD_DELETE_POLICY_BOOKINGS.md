# Add Delete Policy for Bookings Table

If you need to delete orders from the admin dashboard, you'll need to add a delete policy to the `bookings` table.

## SQL Migration

Run this SQL in your Supabase SQL Editor:

```sql
-- Allow anonymous deletes (for admin dashboard)
CREATE POLICY "Allow anonymous deletes" ON public.bookings
  FOR DELETE
  TO anon
  USING (true);
```

## Security Note

⚠️ **Warning:** This policy allows anyone with the anon key to delete bookings. In production, you may want to:
- Restrict deletes to authenticated admin users only
- Add additional checks (e.g., only allow deletes from specific IPs)
- Use a service role key for admin operations instead of the anon key

## Alternative: Use Service Role Key

For better security, you could:
1. Create an API endpoint that uses the service role key
2. Add authentication to the admin dashboard
3. Only allow deletes through the authenticated API endpoint

For now, the anonymous delete policy will work for development and if your admin dashboard is protected by a password.

