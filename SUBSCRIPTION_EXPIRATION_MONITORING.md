# Subscription Expiration Monitoring System

## Overview
This system tracks when canceled subscriptions expire and automatically notifies the admin when it's time to deactivate websites on Netlify.

## Features

### 1. **Visual Countdown Timer in Admin Dashboard**
- Shows days remaining for canceled subscriptions
- Color-coded alerts:
  - 🟡 **Yellow**: More than 7 days remaining
  - 🟠 **Orange**: 7 days or less remaining
  - 🔴 **Red**: Expired (DEACTIVATE NOW!)
- Animated calendar icon and warning emojis for visibility
- Displays exact expiration date

### 2. **Automatic Email Notifications**
- Daily check for expired subscriptions
- Email sent to admin when countdown hits 0
- Includes:
  - Customer details (name, business, email, phone)
  - Days overdue
  - Step-by-step deactivation instructions
  - Direct link to Netlify dashboard

### 3. **Customer-Friendly Cancellation**
- When admin cancels a subscription, it runs until the end of the billing period
- Customer gets full value for their payment
- Admin knows exactly when to deactivate

---

## Setup Instructions

### Step 1: Database Migration

Run this SQL in your Supabase SQL Editor:

```sql
-- Add subscription_end_date column to bookings table
ALTER TABLE bookings 
ADD COLUMN subscription_end_date TIMESTAMPTZ DEFAULT NULL;

-- Add comment for documentation
COMMENT ON COLUMN bookings.subscription_end_date IS 
'The date when the subscription will end (for canceled subscriptions that run until period end)';

-- Create index for querying soon-to-expire subscriptions
CREATE INDEX idx_bookings_subscription_end_date 
ON bookings(subscription_end_date) 
WHERE subscription_end_date IS NOT NULL;

-- Create index for finding subscriptions that need admin notification
CREATE INDEX idx_bookings_expiring_soon 
ON bookings(subscribed, subscription_end_date) 
WHERE subscribed = false AND subscription_end_date IS NOT NULL;
```

### Step 2: Environment Variables

Add these to your `.env.local` and production environment:

```bash
# Email for receiving expiration alerts (defaults to alexanderbonnici214@gmail.com)
ADMIN_EMAIL=your-email@example.com

# Secret key for securing the cron job endpoint
CRON_SECRET=your-random-secret-key-here
```

**Generate a secure CRON_SECRET:**
```bash
# On Mac/Linux
openssl rand -base64 32

# Or use any random string generator
```

**Add to Vercel:**
1. Go to your Vercel project dashboard
2. Settings → Environment Variables
3. Add `ADMIN_EMAIL` (your email)
4. Add `CRON_SECRET` (the random key you generated)
5. Click **Save**

### Step 3: Set Up Cron Job (Vercel)

#### Option A: Vercel Cron (Recommended)

**1. Create `vercel.json` in project root:**

```json
{
  "crons": [
    {
      "path": "/api/check-expired-subscriptions",
      "schedule": "0 9 * * *"
    }
  ]
}
```

**Schedule explanation:**
- `0 9 * * *` = Every day at 9:00 AM UTC (10:00 AM UK time)
- Customize: [Cron Expression Generator](https://crontab.guru/)

**2. Deploy to Vercel:**
```bash
git add vercel.json
git commit -m "Add cron job for subscription expiration monitoring"
git push origin main
```

**3. Verify in Vercel Dashboard:**
- Go to your project
- Click **Settings** → **Cron Jobs**
- You should see: `check-expired-subscriptions` scheduled

#### Option B: External Cron Service (Alternative)

If not using Vercel, use a free cron service like [cron-job.org](https://cron-job.org):

**1. Create account on cron-job.org**

**2. Create new cron job:**
- **URL:** `https://your-domain.com/api/check-expired-subscriptions`
- **Schedule:** Daily at 9:00 AM
- **HTTP Method:** GET
- **Headers:** Add `Authorization: Bearer YOUR_CRON_SECRET`

**3. Save and activate**

### Step 4: Test the System

#### Test 1: Manual API Call

```bash
# Replace with your actual values
curl -X GET https://your-domain.com/api/check-expired-subscriptions \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

**Expected Response (no expired subscriptions):**
```json
{
  "success": true,
  "message": "No expired subscriptions",
  "count": 0
}
```

#### Test 2: Cancel a Test Subscription

1. Go to admin dashboard (ptdash2025)
2. Find a test order with active subscription
3. Click **"Unsubscribe"** → Confirm
4. Check the console logs for:
   ```
   📅 Subscription ends: 2025-12-12T00:00:00.000Z
   ⏰ Days remaining: 27 days
   ✅ Subscription end date stored
   ```
5. Refresh the orders list
6. You should see the countdown timer appear

#### Test 3: Verify Countdown Display

The countdown timer should show:
- **Yellow background**: If more than 7 days
- **Orange background**: If 7 days or less
- **Red background with animation**: If expired

#### Test 4: Force Expired Notification (Optional)

To test the email without waiting for actual expiration:

**Temporarily modify the API (for testing only):**

```typescript
// In app/api/check-expired-subscriptions/route.ts
// Change this line (line 27):
.lte('subscription_end_date', new Date().toISOString())

// To (adds 30 days to current date to catch recent cancellations):
.lte('subscription_end_date', new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString())
```

Then call the API manually. **Revert this change after testing!**

---

## How It Works

### Cancellation Flow

```
Admin clicks "Unsubscribe"
         ↓
1. Get subscription from Stripe
         ↓
2. Read current_period_end (e.g., Dec 31, 2025)
         ↓
3. Calculate days remaining (e.g., 27 days)
         ↓
4. Cancel subscription in Stripe (runs until period end)
         ↓
5. Store end date in database
         ↓
6. Update subscribed = false
         ↓
7. Send cancellation email to customer
         ↓
Admin dashboard shows countdown: "27 Days Remaining"
```

### Daily Monitoring Flow

```
Cron job runs at 9 AM daily
         ↓
Call /api/check-expired-subscriptions
         ↓
Query database for:
  - subscribed = false
  - subscription_end_date <= NOW()
         ↓
If expired subscriptions found:
  ├─ Build email with customer details
  ├─ Include deactivation instructions
  ├─ Send to ADMIN_EMAIL
  └─ Log results
         ↓
Admin receives email: "🚨 URGENT: 2 Expired Subscriptions"
```

---

## Email Notification Details

### What the Admin Email Contains:

1. **Urgent Subject Line**
   ```
   🚨 URGENT: 2 Expired Subscriptions - Deactivate Websites
   ```

2. **Customer Details**
   - Full name and business name
   - Email and phone
   - Exact date subscription ended
   - Days overdue

3. **Action Required Box**
   ```
   🚨 ACTION REQUIRED: Deactivate website on Netlify immediately!
   ```

4. **Step-by-Step Instructions**
   - Direct link to Netlify dashboard
   - Exact steps to deactivate
   - Tips for record keeping

5. **Visual Alerts**
   - Red background for urgency
   - Warning emojis
   - Clear call-to-action

### Sample Email Preview:

![Email Preview](https://via.placeholder.com/600x400?text=Sample+Expiration+Email)

---

## Countdown Timer Color Guide

| Days Remaining | Color | Border | Example |
|---------------|-------|--------|---------|
| 30+ days | 🟡 Yellow | Yellow | "30 Days Remaining" |
| 7-29 days | 🟡 Yellow | Yellow | "15 Days Remaining" |
| 1-6 days | 🟠 Orange | Orange | "3 Days Remaining" ⚠️ |
| 0 days (expired) | 🔴 Red | Red | "⚠️ DEACTIVATE WEBSITE NOW" |

### Visual Examples:

**Active Subscription:**
```
✓ Active Subscription
(Customer ID: cus_TPRlCY12...)
```

**Recently Canceled (Safe):**
```
✗ Subscription Cancelled
(Customer ID: cus_TPRlCY12...)

📅 27 Days Remaining
Website access ends: 31 Dec 2025
```

**Expiring Soon (Warning):**
```
✗ Subscription Cancelled
(Customer ID: cus_TPRlCY12...)

📅 3 Days Remaining ⚠️
Website access ends: 15 Nov 2025
```

**Expired (Critical):**
```
✗ Subscription Cancelled
(Customer ID: cus_TPRlCY12...)

⚠️ DEACTIVATE WEBSITE NOW ⚠️
Subscription expired - disable on Netlify
```

---

## Troubleshooting

### Issue: Countdown not showing

**Possible causes:**
1. Database migration not run
2. `subscription_end_date` is NULL in database
3. Order is still `subscribed: true`

**Fix:**
```sql
-- Check if column exists
SELECT column_name FROM information_schema.columns 
WHERE table_name = 'bookings' AND column_name = 'subscription_end_date';

-- Check specific order
SELECT id, full_name, subscribed, subscription_end_date 
FROM bookings WHERE id = 'YOUR_ORDER_ID';
```

### Issue: Not receiving emails

**Possible causes:**
1. `ADMIN_EMAIL` not set
2. Cron job not running
3. `CRON_SECRET` mismatch

**Fix:**
1. Check environment variables in Vercel
2. Test API manually with curl
3. Check Vercel Function Logs for errors

### Issue: Wrong timezone

The system uses UTC timestamps. If emails arrive at wrong time:

**Fix:** Adjust cron schedule:
```json
{
  "crons": [
    {
      "path": "/api/check-expired-subscriptions",
      "schedule": "0 8 * * *"  // 8 AM UTC = 9 AM UK (BST)
    }
  ]
}
```

### Issue: Getting too many emails

If multiple emails per day:

**Fix:** Cron is running too frequently. Check `vercel.json`:
```json
"schedule": "0 9 * * *"  // Once per day at 9 AM
// NOT: "0 * * * *"  // This runs every hour!
```

---

## Manual Checks

### Check for Expired Subscriptions (SQL)

```sql
-- Find all expired subscriptions
SELECT 
  full_name,
  business_name,
  email,
  subscription_end_date,
  EXTRACT(DAY FROM (NOW() - subscription_end_date)) as days_overdue
FROM bookings
WHERE subscribed = false
  AND subscription_end_date IS NOT NULL
  AND subscription_end_date <= NOW()
ORDER BY subscription_end_date ASC;
```

### Check Upcoming Expirations

```sql
-- Find subscriptions expiring in next 7 days
SELECT 
  full_name,
  business_name,
  email,
  subscription_end_date,
  EXTRACT(DAY FROM (subscription_end_date - NOW())) as days_remaining
FROM bookings
WHERE subscribed = false
  AND subscription_end_date IS NOT NULL
  AND subscription_end_date > NOW()
  AND subscription_end_date <= (NOW() + INTERVAL '7 days')
ORDER BY subscription_end_date ASC;
```

---

## Best Practices

### 1. **Check Dashboard Daily**
Even with automated emails, glance at the admin dashboard daily to see upcoming expirations.

### 2. **Deactivate Promptly**
When you receive an expiration email, deactivate the website same-day to avoid unauthorized access.

### 3. **Keep Records**
After deactivating, note it in your records (spreadsheet or admin dashboard) for reference.

### 4. **Test Regularly**
Once a month, cancel a test subscription to ensure the system works end-to-end.

### 5. **Monitor Cron Logs**
Check Vercel Function Logs weekly to ensure cron runs successfully:
- Vercel Dashboard → Functions → check-expired-subscriptions

---

## Security

### API Protection
The cron endpoint is protected with:
- `Authorization: Bearer` header
- `CRON_SECRET` environment variable
- Only GET requests allowed

### No Public Access
Without the correct `Authorization` header, the API returns:
```json
{
  "error": "Unauthorized"
}
```

### Admin Email Privacy
Admin email is stored securely in environment variables, not in code.

---

## Maintenance

### Weekly Tasks
- [ ] Check Vercel Function Logs for cron execution
- [ ] Verify no expired subscriptions in dashboard
- [ ] Confirm emails are being received

### Monthly Tasks
- [ ] Test full cancellation flow with dummy order
- [ ] Review and update `ADMIN_EMAIL` if needed
- [ ] Check Resend email quota

### Quarterly Tasks
- [ ] Review and optimize database indexes
- [ ] Audit Netlify for any stale websites
- [ ] Update documentation if workflow changes

---

## Support

If you encounter issues:

1. **Check logs:**
   - Vercel → Functions → check-expired-subscriptions
   - Browser console (admin dashboard)

2. **Test manually:**
   ```bash
   curl -X GET https://your-domain.com/api/check-expired-subscriptions \
     -H "Authorization: Bearer YOUR_CRON_SECRET"
   ```

3. **Verify environment variables:**
   - `ADMIN_EMAIL` is set
   - `CRON_SECRET` matches between Vercel and cron service
   - `RESEND_API_KEY` is valid

4. **Database check:**
   ```sql
   SELECT * FROM bookings 
   WHERE subscription_end_date IS NOT NULL 
   LIMIT 5;
   ```

---

## Summary

✅ **Countdown timer** in admin dashboard shows days remaining  
✅ **Visual alerts** with color-coded warnings  
✅ **Automated emails** when subscriptions expire  
✅ **Customer-friendly** cancellation (runs until period end)  
✅ **Secure API** with token authentication  
✅ **Daily monitoring** via cron job  

This system ensures you never miss a subscription expiration and always know when to deactivate websites on Netlify! 🎉

