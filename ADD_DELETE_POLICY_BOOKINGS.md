# Delete Order API - Secure Admin-Only Deletion

The delete order functionality is now secured through an API endpoint that requires admin authentication.

## How It Works

1. **API Endpoint**: `/api/delete-order` - Requires admin password authentication
2. **Admin Password**: Verified against `ADMIN_PASSWORD` environment variable
3. **Service Role Key**: Uses Supabase service role key (if available) to bypass RLS, or falls back to anon key with admin password verification

## Setup

### 1. Environment Variables

Make sure you have `ADMIN_PASSWORD` set in your `.env.local`:

```env
ADMIN_PASSWORD=your_secure_admin_password_here
```

### 2. Optional: Service Role Key (Recommended for Production)

For better security, add your Supabase service role key:

```env
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

**To get your service role key:**
1. Go to Supabase Dashboard → Project Settings → API
2. Copy the "service_role" key (keep this secret!)
3. Add it to your environment variables

**⚠️ Important:** Never expose the service role key in client-side code. It should only be used in server-side API routes.

### 3. Database Policies

**You do NOT need to add a delete policy** for the bookings table. The API uses:
- Service role key (bypasses RLS) - if configured
- Or admin password verification with anon key

## Security Features

✅ **Admin Password Required**: All delete requests must include a valid admin password  
✅ **Server-Side Verification**: Password is verified on the server, not client  
✅ **Service Role Key**: Uses elevated permissions only on the server  
✅ **No Public Delete Access**: No anonymous delete policy needed in database  

## Testing

The delete functionality will:
1. Require admin authentication
2. Show a confirmation dialog
3. Warn if customer has active subscription
4. Delete the order securely through the API
5. Update the UI after successful deletion

