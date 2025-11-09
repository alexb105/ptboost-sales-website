# Stripe Webhook Local Testing Setup

When testing locally, Stripe can't reach your localhost webhook. You need to use Stripe CLI to forward webhook events.

## Setup Steps

### 1. Install Stripe CLI
```bash
# On macOS
brew install stripe/stripe-cli/stripe

# Or download from https://stripe.com/docs/stripe-cli
```

### 2. Login to Stripe
```bash
stripe login
```

### 3. Forward webhooks to localhost
```bash
# Start your Next.js dev server first
pnpm dev

# In another terminal, forward webhooks
stripe listen --forward-to localhost:3000/api/stripe-webhook
```

You'll see output like:
```
> Ready! Your webhook signing secret is whsec_xxxxxxxxxxxxx
```

### 4. Update your .env.local
Add the webhook secret from the previous step:
```
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
```

### 5. Restart your dev server
```bash
# Stop the dev server (Ctrl+C) and restart
pnpm dev
```

### 6. Test a payment
Now make a test payment and you'll see webhook events in the Stripe CLI terminal.

## Verify It's Working

When you make a payment, you should see:
1. In Stripe CLI terminal: `checkout.session.completed` event
2. In your dev server logs:
   - `Payment successful: cs_test_xxxxx`
   - `Buyout detection:` with detection results
   - `🎉 Website buyout detected!` (if detected)
   - `✅ Marked website as owned for: [email]` (if successful)

## Troubleshooting

- **"Connection refused"**: Make sure your dev server is running on port 3000
- **"No webhook secret"**: Make sure you added `STRIPE_WEBHOOK_SECRET` to `.env.local`
- **"Invalid signature"**: Restart your dev server after adding the webhook secret

## For Production

In production, configure the webhook in Stripe Dashboard:
1. Go to Developers → Webhooks
2. Add endpoint: `https://yourdomain.com/api/stripe-webhook`
3. Select events: `checkout.session.completed`
4. Copy the signing secret and add to your production environment variables

