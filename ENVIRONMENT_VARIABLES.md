# Environment Variables Configuration

## Required Environment Variables

Copy these variables to your `.env.local` file and fill in the values.

```bash
# ============================================
# Supabase Configuration
# ============================================
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# ============================================
# Stripe Configuration
# ============================================
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_or_sk_live_for_production
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
STRIPE_SUBSCRIPTION_PRICE_ID=price_your_monthly_subscription_price_id_without_trial

# ============================================
# Site Configuration
# ============================================
NEXT_PUBLIC_BASE_URL=https://ptboost.co.uk
NEXT_PUBLIC_SITE_URL=https://ptboost.co.uk

# ============================================
# Email Configuration (Resend)
# ============================================
RESEND_API_KEY=re_your_resend_api_key

# ============================================
# Admin Configuration
# ============================================
ADMIN_PASSWORD=your_secure_admin_password
```

---

## Variable Descriptions

### Supabase

**`NEXT_PUBLIC_SUPABASE_URL`**
- Your Supabase project URL
- Found in: Supabase Dashboard → Settings → API
- Example: `https://abcdefghijklmnop.supabase.co`

**`NEXT_PUBLIC_SUPABASE_ANON_KEY`**
- Your Supabase anonymous/public key
- Found in: Supabase Dashboard → Settings → API → Project API keys
- Example: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

---

### Stripe

**`STRIPE_SECRET_KEY`**
- Your Stripe secret API key
- Found in: Stripe Dashboard → Developers → API keys → Secret key
- **Important:** Use test key (`sk_test_...`) for development, live key (`sk_live_...`) for production
- ⚠️ **Never expose this in client-side code!**

**`STRIPE_WEBHOOK_SECRET`**
- Your Stripe webhook signing secret
- Found in: Stripe Dashboard → Developers → Webhooks → Select your webhook → Signing secret
- Example: `whsec_abcdef123456...`
- Used to verify webhook requests are from Stripe

**`STRIPE_SUBSCRIPTION_PRICE_ID`** ⭐ **NEW**
- Your monthly subscription price ID (without free trial)
- Found in: Stripe Dashboard → Products → Your subscription → Pricing
- Example: `price_1QMN9SKjqM8L2VGihvZ8hLwW`
- **Important:** This should be the price **WITHOUT** a trial for resubscriptions
- How to find:
  1. Go to Products
  2. Click your PT Website Subscription product
  3. Look at the Prices section
  4. Copy the ID that starts with `price_`

---

### Site Configuration

**`NEXT_PUBLIC_BASE_URL`**
- Your website's base URL
- Used for email links and redirects
- Example: `https://ptboost.co.uk`
- **Local development:** `http://localhost:3000`

**`NEXT_PUBLIC_SITE_URL`**
- Same as BASE_URL (used in some components)
- Example: `https://ptboost.co.uk`

---

### Email (Resend)

**`RESEND_API_KEY`**
- Your Resend API key
- Found in: Resend Dashboard → API Keys
- Example: `re_123abc456def...`
- Used to send transactional emails

---

### Admin

**`ADMIN_PASSWORD`**
- Password for admin dashboard access
- Choose a strong, unique password
- Used to access `/ptdash2025` and admin APIs
- Example: `MySecureAdminPass123!`

---

## Setup Instructions

### 1. Create `.env.local` file

```bash
cd /path/to/pt-lead-magnet
touch .env.local
```

### 2. Copy template and fill in values

Copy the environment variables template above into your `.env.local` file and replace the placeholder values with your actual credentials.

### 3. Restart your development server

```bash
npm run dev
# or
pnpm dev
```

---

## Security Best Practices

✅ **Never commit** `.env.local` to git (already in `.gitignore`)  
✅ **Use different keys** for development and production  
✅ **Rotate keys regularly** (especially if exposed)  
✅ **Use strong passwords** for admin access  
✅ **Restrict webhook IPs** in Stripe dashboard (production)  

---

## Environment-Specific Configuration

### Development (Local)
```bash
NEXT_PUBLIC_BASE_URL=http://localhost:3000
STRIPE_SECRET_KEY=sk_test_...
```

### Production (Live)
```bash
NEXT_PUBLIC_BASE_URL=https://ptboost.co.uk
STRIPE_SECRET_KEY=sk_live_...
```

---

## Verifying Configuration

### Check Supabase Connection
```bash
# Visit: http://localhost:3000/api/capacity
# Should return capacity data if configured correctly
```

### Check Stripe Connection
```bash
# Visit admin dashboard and try updating payment links
# Should work if Stripe key is valid
```

### Check Email Configuration
```bash
# Complete a booking and check if confirmation email is sent
# Check Resend dashboard for delivery status
```

---

## Troubleshooting

### "Missing environment variable" error
- Check variable name spelling
- Ensure `.env.local` is in project root
- Restart dev server after adding variables

### Stripe webhooks not working locally
- Use Stripe CLI for local testing:
```bash
stripe listen --forward-to localhost:3000/api/stripe-webhook
```

### Emails not sending
- Verify Resend API key
- Check domain is verified in Resend
- View logs in Resend dashboard

---

## Required Variables by Feature

### Basic Functionality
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_BASE_URL`

### Email Notifications
- `RESEND_API_KEY`

### Stripe Webhooks
- `STRIPE_WEBHOOK_SECRET`

### Resubscription Feature ⭐ NEW
- `STRIPE_SUBSCRIPTION_PRICE_ID`

### Admin Dashboard
- `ADMIN_PASSWORD`

---

## Finding Your Stripe Price ID

### Step-by-Step Guide

1. **Go to Stripe Dashboard**
   - Visit: https://dashboard.stripe.com

2. **Navigate to Products**
   - Click "Products" in the left sidebar

3. **Find Your Subscription Product**
   - Look for "PT Website Subscription" (or your product name)
   - Click to open

4. **View Pricing**
   - Scroll to the "Pricing" section
   - You should see your monthly price (£7.99)

5. **Copy Price ID**
   - Each price has an ID starting with `price_`
   - Copy the one **WITHOUT a free trial** (for resubscriptions)
   - Example: `price_1QMN9SKjqM8L2VGihvZ8hLwW`

6. **Add to Environment Variables**
   ```bash
   STRIPE_SUBSCRIPTION_PRICE_ID=price_1QMN9SKjqM8L2VGihvZ8hLwW
   ```

### Creating the Price (If It Doesn't Exist)

If you don't have a price without trial:

1. Go to your product in Stripe
2. Click **"Add another price"**
3. Configure:
   - **Billing period:** Monthly
   - **Price:** £7.99 (or your amount)
   - **Trial period:** Leave empty (no trial)
4. Click **Save**
5. Copy the new `price_...` ID

---

## Support

If you need help with:
- Setting up environment variables
- Finding Stripe configuration
- Troubleshooting connection issues
- Security best practices

Just ask! 🚀

