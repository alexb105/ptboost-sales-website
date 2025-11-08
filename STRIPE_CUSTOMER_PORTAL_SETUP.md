# Stripe Customer Portal Setup Guide

This guide explains how to enable subscription cancellation and management via Stripe's Customer Portal.

## Overview

With the Customer Portal enabled, your customers can:
- ✅ Cancel or pause their subscription
- ✅ Update payment methods
- ✅ View billing history and invoices
- ✅ Update billing information
- ✅ Download receipts

All self-service, without requiring your manual intervention!

## 🚀 Quick Setup (5 minutes)

### Step 1: Run Database Migration

First, add the `stripe_customer_id` column to your bookings table:

1. Go to your Supabase project
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy and paste this SQL:

```sql
-- Add stripe_customer_id column to bookings table
ALTER TABLE public.bookings 
ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_bookings_stripe_customer_id 
ON public.bookings(stripe_customer_id);
```

5. Click **Run**

### Step 2: Configure Stripe Customer Portal

1. **Go to Stripe Dashboard**
   - Log in to [https://dashboard.stripe.com](https://dashboard.stripe.com)

2. **Navigate to Customer Portal Settings**
   - Go to **Settings** → **Customer Portal** (or visit [https://dashboard.stripe.com/settings/billing/portal](https://dashboard.stripe.com/settings/billing/portal))

3. **Activate the Customer Portal**
   - Click **"Activate test link"** (for test mode) or **"Activate"** (for live mode)

4. **Configure Portal Settings**

   **Recommended Settings:**
   
   - ✅ **Subscriptions**: Allow customers to cancel
     - Set cancellation behavior: "Cancel immediately" or "Cancel at period end"
     - Optionally: Require cancellation reason
   
   - ✅ **Payment Methods**: Allow customers to update
   
   - ✅ **Invoices**: Allow customers to view invoice history
   
   - ✅ **Customer Information**: Allow customers to update email and address
   
   - ❌ **Payment Methods (Add New)**: Optional - Enable if you want customers to add backup cards

5. **Customize Branding** (Optional)
   - Upload your logo
   - Set your brand color
   - Add your business name

6. **Configure Business Information**
   - Add your business details (appears on invoices)
   - Set contact email
   - Add terms of service/privacy policy links

7. **Save Changes**
   - Click **"Save changes"** at the bottom

### Step 3: Add Environment Variable

Add this to your `.env.local` file:

```env
# Your website URL (used for Customer Portal return URL)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

For production, update this to your actual domain:

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Step 4: Test the Integration

1. **Make a Test Purchase**
   - Go to your website
   - Fill out the booking form
   - Use Stripe test card: `4242 4242 4242 4242`
   - Any future expiry date and any 3-digit CVC

2. **Access the Portal**
   - After successful payment, click **"Manage Subscription"** button
   - Or go to `/manage-subscription` directly
   - Enter the email you used for the test purchase
   - Click **"Access Portal"**

3. **Test Cancellation**
   - In the portal, click **"Cancel subscription"**
   - Follow the prompts
   - Verify cancellation works

4. **Check Stripe Dashboard**
   - Go to **Customers** in Stripe Dashboard
   - Find your test customer
   - Verify subscription status updated to "Canceled"

## 📋 What Was Implemented

### 1. Database Changes
- Added `stripe_customer_id` column to `bookings` table
- Stores customer ID when webhook receives payment confirmation

### 2. New API Route
**`/api/create-portal-session/route.ts`**
- Takes customer email
- Looks up their Stripe customer ID from database
- Creates a Customer Portal session
- Returns portal URL

### 3. New Page
**`/app/manage-subscription/page.tsx`**
- User-friendly form for email entry
- Redirects to Stripe Customer Portal
- Shows success message on return
- Lists what users can do in the portal

### 4. Updated Webhook
**`/app/api/stripe-webhook/route.ts`**
- Now captures and stores `stripe_customer_id` on successful payment
- Handles `customer.subscription.deleted` events (for logging)

### 5. Navigation Links Added
- Footer: "Manage Subscription" link
- Success Page: "Manage Subscription" button
- Accessible from anywhere on the site

## 🔒 Security Considerations

### Customer Portal is Secure
- Stripe handles all authentication
- One-time session URLs that expire
- No passwords stored in your database
- PCI compliant out of the box

### What's Stored in Your Database
- Only the Stripe customer ID (e.g., `cus_xxxxx`)
- No credit card information
- No sensitive payment data
- All PII handled by Stripe

## 🎯 Customer Experience Flow

### For New Customers:
1. Fill out booking form
2. Redirected to Stripe payment link
3. Complete payment
4. Land on success page with "Manage Subscription" button
5. Can immediately access portal to update payment method, etc.

### For Existing Customers:
1. Visit `/manage-subscription` from footer link
2. Enter their email address
3. Click "Access Portal"
4. Redirected to secure Stripe portal
5. Can cancel, update payment, view invoices, etc.
6. Return to your site when done

## 🛠️ Troubleshooting

### Error: "No active subscription found for this email"

**Cause**: Email not found in database with a customer ID

**Solutions**:
1. Check email is spelled correctly
2. Verify customer completed payment (check Stripe Dashboard → Customers)
3. Check database: 
   ```sql
   SELECT email, stripe_customer_id FROM bookings 
   WHERE email = 'customer@example.com';
   ```
4. If customer ID missing, webhook may not have fired - manually add it:
   ```sql
   UPDATE bookings 
   SET stripe_customer_id = 'cus_xxxxx' 
   WHERE email = 'customer@example.com';
   ```

### Customer Portal Not Loading

**Cause**: Portal not activated in Stripe Dashboard

**Solution**: 
1. Go to Stripe Dashboard → Settings → Customer Portal
2. Click "Activate test link" (test mode) or "Activate" (live mode)

### Webhook Not Capturing Customer ID

**Cause**: Webhook not properly configured

**Solutions**:
1. Check webhook is receiving events in Stripe Dashboard → Developers → Webhooks
2. Verify `STRIPE_WEBHOOK_SECRET` is set correctly in `.env.local`
3. Check webhook logs in your hosting platform
4. For local testing, use Stripe CLI: `stripe listen --forward-to localhost:3000/api/stripe-webhook`

### Portal Returns to Wrong URL

**Cause**: `NEXT_PUBLIC_SITE_URL` not set correctly

**Solution**:
- Update `.env.local` with correct URL
- Restart your dev server
- For production, set environment variable in your hosting platform (Vercel, Netlify, etc.)

## 📊 Monitoring & Analytics

### Track Cancellations

In Stripe Dashboard:
- **Reports** → **Subscriptions** → View churn rate
- **Customers** → Filter by "Canceled"
- Set up email alerts for cancellations

### Common Metrics to Watch:
- Monthly churn rate
- Cancellation reasons (if you enabled the feature)
- Time to cancellation (lifetime value)
- Reactivation rate

### In Your Database:

Check recent cancellations:
```sql
SELECT email, full_name, created_at, stripe_customer_id
FROM bookings 
WHERE payment_status = 'completed'
ORDER BY created_at DESC;
```

## 🎨 Customization Options

### Portal Appearance
- **Branding**: Add logo and colors in Stripe Dashboard
- **Business Info**: Update company name, support email
- **Terms Links**: Add privacy policy and terms of service

### What Customers Can Do
Configure in Stripe Dashboard → Settings → Customer Portal:

**Subscriptions**:
- Allow cancellation (yes/no)
- Cancellation behavior (immediate vs. end of period)
- Pause subscriptions (optional)
- Switch plans (optional)

**Payment Methods**:
- Update existing card
- Add additional cards
- Remove old cards

**Invoices**:
- View history
- Download PDFs
- See upcoming invoices

**Customer Info**:
- Update email
- Update billing address
- Update shipping address (optional)

## 💡 Best Practices

### 1. Set Up Cancellation Surveys
In Stripe Dashboard → Customer Portal settings:
- Enable "Ask for cancellation reason"
- Review feedback regularly to improve retention

### 2. Offer Retention Incentives
- Set up Stripe Billing Offers to show discount when canceling
- "Cancel & get 50% off for 3 months" option

### 3. Send Exit Emails
Set up automated emails when subscription is canceled:
- Thank them for being a customer
- Ask for feedback
- Offer reactivation incentive
- Remind them their site stays live until period end

### 4. Win-Back Campaigns
- Email canceled customers after 30, 60, 90 days
- Offer special pricing to return
- Share new features/improvements

### 5. Monitor & React
- Set up Slack/email alerts for cancellations
- Reach out personally to high-value customers
- Fix common issues that lead to cancellation

## 📧 Email Templates for Customers

### Welcome Email (After Signup)
Include this in your booking confirmation email:

```
Manage Your Subscription Anytime
─────────────────────────────────
You can cancel, pause, or update your subscription at any time:
→ Visit: [your-site.com/manage-subscription]

No complicated process, no need to contact us. 
Simply enter your email and access your secure portal.
```

### Cancellation Confirmation
Stripe automatically sends this, but you can customize it in:
- Stripe Dashboard → Settings → Emails → Subscription canceled

### Re-engagement (30 days after cancel)
```
Subject: We miss you! Special offer inside

Hi [Name],

We noticed you canceled your subscription. We'd love to have you back!

Special Offer: 40% off for the next 3 months

→ Reactivate here: [your-site.com/manage-subscription]

Or let us know if there's anything we can improve:
[feedback-form-link]
```

## 🚀 Next Steps

### Phase 1 (Complete ✅)
- ✅ Database setup for customer IDs
- ✅ API route for portal sessions
- ✅ Subscription management page
- ✅ Navigation links added
- ✅ Webhook updated to capture customer IDs

### Phase 2 (Optional - Future Enhancements)
- [ ] Add subscription status to database
- [ ] Show subscription status in admin dashboard
- [ ] Send custom cancellation confirmation email
- [ ] Implement win-back email automation
- [ ] Add analytics dashboard for churn metrics
- [ ] Create retention offers in Stripe
- [ ] Set up cancellation survey
- [ ] Add pause subscription feature
- [ ] Offer plan upgrades/downgrades

### Phase 3 (Advanced - Future)
- [ ] Custom cancellation flow with retention offers
- [ ] In-app subscription management (bypass Stripe portal)
- [ ] Predictive churn modeling
- [ ] A/B test cancellation flows
- [ ] Implement save flows ("Stay for 50% off!")

## 📚 Additional Resources

- [Stripe Customer Portal Docs](https://stripe.com/docs/billing/subscriptions/integrating-customer-portal)
- [Stripe Webhooks Guide](https://stripe.com/docs/webhooks)
- [Reducing Churn with Stripe](https://stripe.com/guides/reduce-churn)
- [Customer Portal Customization](https://stripe.com/docs/customer-management)

## ❓ Need Help?

If you run into issues:

1. **Check Stripe Dashboard Logs**
   - Developers → Webhooks → [Your webhook] → Events
   - Look for failed events or errors

2. **Check Your Application Logs**
   - Vercel: Project → Logs
   - Netlify: Site → Functions → Logs
   - Local: Check terminal output

3. **Test with Stripe CLI**
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe-webhook
   stripe trigger checkout.session.completed
   ```

4. **Contact Stripe Support**
   - Available 24/7 in Stripe Dashboard
   - Very responsive and helpful

---

## Summary

You now have a fully functional subscription management system where customers can:
- Cancel subscriptions instantly
- Update payment methods
- View billing history
- Download invoices

All handled securely by Stripe, with zero maintenance required on your end! 🎉


