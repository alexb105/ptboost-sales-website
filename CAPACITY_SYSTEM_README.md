# Capacity Management System

Your PT Lead Magnet now uses a **capacity counter system** instead of Google Sheets!

## 🎯 What's New

### Automatic Capacity Management
- Set a number of available spots (e.g., 5)
- Each successful Stripe purchase automatically decrements the count by 1
- When capacity reaches 0, the CTA button is disabled
- Visitors see a "Get Notified" form when sold out

### Admin Dashboard (`/admin`)
- Password-protected access
- Set or reset capacity with number input
- Quick preset buttons (0, 1, 3, 5, 10 spots)
- Real-time status display
- See when capacity was last updated

### Visitor Experience
- See remaining spots counter on main page
- Visual urgency indicators:
  - Green badge when 4+ spots remain
  - Red badge when ≤3 spots remain
  - Special "🔥 Only 1 Spot Left!" message
- Button automatically disables at 0 capacity

## 📦 What Was Installed

```bash
@supabase/supabase-js  # Database client
stripe                  # Payment webhook handling
```

## 🗂️ New Files Created

- `lib/supabase.ts` - Supabase client configuration
- `app/api/capacity/route.ts` - GET/POST endpoints for capacity
- `app/api/stripe-webhook/route.ts` - Handles payment webhooks
- `app/admin/page.tsx` - Admin dashboard UI
- `SUPABASE_SETUP.md` - Complete setup guide
- `ENV_VARIABLES.md` - Environment variables reference

## 🔧 Modified Files

- `components/cta-section.tsx` - Uses capacity count, shows spot counter
- `package.json` - Added new dependencies

## 🚀 Quick Setup

1. **Create Supabase account** (free): https://app.supabase.com
2. **Run SQL** from `SUPABASE_SETUP.md` to create the database table
3. **Add environment variables** to `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
   ADMIN_PASSWORD=your_password
   STRIPE_SECRET_KEY=sk_test_xxx
   STRIPE_WEBHOOK_SECRET=whsec_xxx
   RESEND_API_KEY=your_existing_key
   ```
4. **Set up Stripe webhook**:
   - Dashboard → Webhooks → Add endpoint
   - URL: `https://yourdomain.com/api/stripe-webhook`
   - Event: `checkout.session.completed`
5. **Test it**: Visit `/admin` and set capacity to 5

## 📊 How It Works

### Flow Diagram
```
Visitor → Sees "5 Spots Remaining" → Clicks CTA → Stripe Checkout
                                                        ↓
Admin Dashboard ← Can reset count ← Capacity = 4 ← Webhook decrements
```

### Database Table
Single-row table `capacity_status`:
- `id`: Always 1 (enforced by constraint)
- `capacity_count`: Number of spots (e.g., 5)
- `updated_at`: Timestamp of last change

## 🎨 UI Features

### Main Page
- Spot counter badge (green/red based on availability)
- Button automatically disables at 0
- "Get Notified" form appears when sold out

### Admin Dashboard
- Clean, modern interface matching your site design
- Number input with validation
- Quick preset buttons for common values
- Real-time status indicator with color coding
- Success/error alerts

## 🔒 Security

- Admin password required for updates (server-side validation)
- Stripe webhook signature verification
- Supabase Row Level Security (RLS) enabled
- Public can only read capacity, not modify it
- All sensitive keys kept server-side

## 🧪 Testing

### Local Development
1. Start dev server: `pnpm dev`
2. Visit `/admin`, set capacity to 3
3. Check main page - should show "3 Spots Remaining"
4. Use Stripe CLI for webhook testing:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe-webhook
   ```
5. Make a test purchase
6. Verify capacity decreased to 2

### Production
- Set up production Stripe webhook endpoint
- Use production keys (not test keys)
- Test with real Stripe checkout

## 📝 Common Tasks

### Reset Capacity
1. Go to `/admin`
2. Enter new number (e.g., 10)
3. Click "Update"
4. Changes are instant

### Check Current Status
- Visit `/admin` to see current count
- Or check main page - spot counter shows current availability

### Sold Out?
1. Admin sets capacity to 0, or
2. Capacity automatically hits 0 from purchases
3. Button shows "Get Notified" form
4. Visitors can sign up for notification emails

## 🐛 Troubleshooting

### Capacity not decreasing after purchase
- Check Stripe webhook is configured correctly
- Verify `STRIPE_WEBHOOK_SECRET` in env vars
- Check webhook logs in Stripe Dashboard
- Ensure endpoint is publicly accessible (in production)

### Can't access admin panel
- Verify `ADMIN_PASSWORD` is set in `.env.local`
- Restart dev server after changing env vars
- Check browser console for errors

### Spot counter not showing
- Check Supabase connection
- Verify environment variables are correct
- Check browser network tab for API errors

## 🎉 Benefits Over Google Sheets

✅ **Automatic** - No manual updates needed  
✅ **Real-time** - Updates instantly  
✅ **Reliable** - No API rate limits  
✅ **Secure** - Password-protected admin  
✅ **Professional** - Better UX for you and visitors  
✅ **Scalable** - Handles high traffic easily  
✅ **Free** - Supabase free tier is generous  

---

For detailed setup instructions, see `SUPABASE_SETUP.md`  
For environment variables, see `ENV_VARIABLES.md`

