# PT Lead Magnet Setup Instructions

This document provides step-by-step instructions for setting up the PT Lead Magnet application with all required services.

## Prerequisites

- Node.js 18+ installed
- pnpm installed (or npm/yarn)
- A Stripe account
- A Supabase account
- A Resend account

## Environment Variables Setup

Create a `.env.local` file in the root directory with the following variables:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Resend Configuration
RESEND_API_KEY=re_your_resend_api_key_here

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## 1. Stripe Setup

### Using Static Payment Link (Current Setup)

The application uses a Stripe Payment Link: `https://buy.stripe.com/28E3cwgwy9tN0xrgED0co02`

**Important**: Configure the success URL in your Stripe Payment Link:

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/payment-links)
2. Find your payment link (or create a new one)
3. Edit the payment link
4. Set the **Success URL** to:
   - Development: `http://localhost:3000/success`
   - Production: `https://yourdomain.com/success`
5. Save the payment link

### Get API Keys (for webhook)

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to Developers → API keys
3. Copy your **Secret key** and add it to `STRIPE_SECRET_KEY`

### Configure Webhook

The webhook is only needed for capacity decrement (booking data is handled via Supabase):

1. Navigate to Developers → Webhooks
2. Click "Add endpoint"
3. Enter your webhook URL: `https://yourdomain.com/api/stripe-webhook`
   - For local testing, use [Stripe CLI](https://stripe.com/docs/stripe-cli) or [ngrok](https://ngrok.com/)
4. Select the following event: `checkout.session.completed`
5. Copy the **Signing secret** and add it to `STRIPE_WEBHOOK_SECRET`

## 2. Supabase Setup

You need to set up TWO tables in Supabase:

### Quick Steps:

1. Create a new project at [Supabase](https://supabase.com)
2. Copy your project URL to `NEXT_PUBLIC_SUPABASE_URL`
3. Copy your anon/public key to `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Set up the `capacity_status` table - see [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
5. Set up the `bookings` table - see [SUPABASE_BOOKINGS_SETUP.md](./SUPABASE_BOOKINGS_SETUP.md)

### Why Two Tables?

- **capacity_status**: Tracks available booking slots (original feature)
- **bookings**: Stores customer form data before payment (new feature)

## 3. Resend Setup

### Create Account

1. Go to [Resend](https://resend.com) and create an account
2. Verify your email address

### Get API Key

1. Navigate to Settings → API Keys
2. Click "Create API Key"
3. Give it a name (e.g., "PT Lead Magnet")
4. Copy the API key and add it to `RESEND_API_KEY`

### Configure Sending Domain (Recommended for Production)

For production, you should verify your own domain:

1. Navigate to Domains
2. Click "Add Domain"
3. Enter your domain (e.g., `yourdomain.com`)
4. Add the provided DNS records to your domain provider
5. Wait for verification (usually takes a few minutes)

Once verified, update the "from" address in `app/api/send-booking-email/route.ts`:

```typescript
from: 'Bookings <bookings@yourdomain.com>',  // Use your verified domain
```

### Test Email (Development)

For development/testing, you can use the default Resend test domain:
- `onboarding@resend.dev` (already configured in the code)
- Note: This only sends to verified email addresses in your Resend account

To receive test emails:
1. Go to Resend Dashboard → Settings → Emails
2. Add `alexander.ptboost@gmail.com` as a verified email
3. Check the inbox to verify

## 4. Install Dependencies

```bash
pnpm install
```

## 5. Run Development Server

```bash
pnpm dev
```

Visit `http://localhost:3000` to see the application.

## 6. Test the Booking Flow

1. Click "Secure My £59 Website Now!" button
2. Fill out the multi-step form:
   - Step 1: Personal Information (name, email, phone)
   - Step 2: Business Information (business name, location, specialization)
   - Step 3: Website Preferences (colors, goals, notes)
3. Click "Proceed to Payment"
4. Complete the Stripe checkout with test card: `4242 4242 4242 4242`
5. After successful payment, you should receive an email at `alexander.ptboost@gmail.com` with all the booking details

## 7. Production Deployment

### Environment Variables

When deploying to production (Vercel, Netlify, etc.), make sure to:

1. Add all environment variables to your hosting platform
2. Update `NEXT_PUBLIC_BASE_URL` to your production domain
3. Update the Stripe webhook URL to point to your production domain
4. Use your verified Resend domain for the "from" address

### Stripe Webhook for Production

1. Create a new webhook endpoint in Stripe Dashboard
2. Point it to `https://yourdomain.com/api/stripe-webhook`
3. Copy the new signing secret
4. Update `STRIPE_WEBHOOK_SECRET` in your production environment variables

### Test Everything

After deployment:
1. Test the complete booking flow with Stripe test cards
2. Verify emails are being sent correctly
3. Check capacity system is working
4. Monitor the Stripe webhook logs

## Troubleshooting

### Emails Not Sending

1. Check Resend API key is correct
2. Verify `alexander.ptboost@gmail.com` is added as a verified email in Resend
3. Check Resend dashboard logs for errors
4. For production, ensure your domain is verified

### Stripe Webhook Not Working

1. Verify webhook secret is correct
2. Check webhook URL is accessible from the internet
3. For local development, use Stripe CLI for webhook forwarding
4. Check Next.js API route logs for errors

### Capacity System Not Updating

1. Verify Supabase credentials are correct
2. Check the `capacity_status` table exists and has data
3. Look for errors in the webhook handler logs

## Support

For issues or questions, check:
- Stripe Documentation: https://stripe.com/docs
- Resend Documentation: https://resend.com/docs
- Supabase Documentation: https://supabase.com/docs
- Next.js Documentation: https://nextjs.org/docs

## Security Notes

- Never commit `.env.local` to version control
- Use environment variables for all sensitive keys
- Rotate API keys regularly
- Use webhook signature verification (already implemented)
- Keep dependencies updated

