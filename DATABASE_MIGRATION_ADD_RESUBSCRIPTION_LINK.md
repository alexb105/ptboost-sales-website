# Database Migration: Add Resubscription Link to Payment Links Table

## Overview
Add a `resubscription_link` field to store a separate Stripe payment link for users who are re-subscribing (no free trial).

## Date
November 12, 2025

## Rationale
When users cancel their subscription and want to re-subscribe, they shouldn't receive another free trial. This separate payment link ensures they pay the full price from the start.

## Changes

### Add Resubscription Link Column
```sql
-- Add resubscription_link column to payment_links table
ALTER TABLE payment_links 
ADD COLUMN resubscription_link TEXT;

-- Set the resubscription link (update with your actual link)
UPDATE payment_links 
SET resubscription_link = 'https://buy.stripe.com/eVq00k1BE5dxfslcon0co07'
WHERE id = 1;
```

## Verification

After running the migration, verify with:

```sql
-- Check that column was added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'payment_links' 
  AND column_name = 'resubscription_link';

-- View current payment links
SELECT 
  subscription_link,
  resubscription_link,
  buyout_link,
  updated_at 
FROM payment_links 
WHERE id = 1;
```

## Usage

### Subscription Types

| Scenario | Link to Use | Has Free Trial? |
|----------|-------------|-----------------|
| First-time subscriber | `subscription_link` | ✅ Yes |
| Re-subscribing user | `resubscription_link` | ❌ No |
| Website buyout | `buyout_link` | N/A |

### When to Use Each Link

**`subscription_link`** - New customers who have never subscribed before
- Usually includes free trial
- Example: 7-day free trial, then £7.99/month

**`resubscription_link`** - Customers who previously had a subscription
- No free trial
- Charges immediately at £7.99/month
- Prevents free trial abuse

**`buyout_link`** - One-time payment for full website ownership
- £299 one-time fee
- No monthly payments

## Application Logic

The application should determine which link to use based on subscription history:

```typescript
// Pseudo-code logic
if (user.subscribed === true) {
  // Currently subscribed - show cancel button
  showCancelButton()
} else if (user.has_ever_subscribed) {
  // Was subscribed before - use resubscription link (no free trial)
  useResubscriptionLink()
} else {
  // Never subscribed - use regular subscription link (with free trial)
  useSubscriptionLink()
}
```

## Detecting Previous Subscriptions

To determine if a user has ever been subscribed, check:

```sql
-- Check if user was ever subscribed
SELECT 
  email,
  subscribed, -- current status
  stripe_customer_id, -- presence indicates they had a subscription
  payment_status
FROM bookings 
WHERE email = 'user@example.com';

-- If stripe_customer_id is not null, they've been subscribed before
```

**Logic:**
- If `stripe_customer_id` exists → User has been subscribed before → Use `resubscription_link`
- If `stripe_customer_id` is null → New user → Use `subscription_link`

## Rollback (if needed)

```sql
-- Remove resubscription_link column
ALTER TABLE payment_links 
DROP COLUMN resubscription_link;
```

## Notes

- The resubscription link should charge immediately (no free trial)
- This prevents users from canceling and re-subscribing to get multiple free trials
- Both links should lead to the same subscription plan, just different trial settings
- Make sure both Stripe payment links are configured correctly in Stripe dashboard

## Stripe Payment Link Configuration

### Regular Subscription Link (First-time)
- Payment link URL: `subscription_link`
- Subscription interval: Monthly
- Price: £7.99/month
- Free trial: 7 days (or your trial period)
- Allow promotion codes: Optional

### Resubscription Link (Returning users)
- Payment link URL: `resubscription_link = 'https://buy.stripe.com/eVq00k1BE5dxfslcon0co07'`
- Subscription interval: Monthly
- Price: £7.99/month
- Free trial: **None** ❌
- Allow promotion codes: Optional

## Benefits

✅ **Prevents Free Trial Abuse** - Users can't cancel and re-subscribe for multiple trials  
✅ **Fair Pricing** - Returning users pay immediately  
✅ **Automatic Detection** - System knows who has been subscribed before  
✅ **Better Revenue** - No lost revenue from trial gaming  
✅ **Professional** - Industry-standard practice  

## Related Files

- `app/api/payment-links/route.ts` - Payment links API
- `app/account/page.tsx` - Account dashboard (uses links)
- `lib/supabase-types.ts` - TypeScript types

## Testing Checklist

After migration:

- [ ] Verify column exists in payment_links table
- [ ] Set the resubscription link URL
- [ ] Test API returns resubscription link
- [ ] Test account page uses correct link
- [ ] Verify new users see subscription link (with trial)
- [ ] Verify returning users see resubscription link (no trial)
- [ ] Test payment flow works with both links

## Support

If you need to:
- Update the resubscription link URL
- Change trial settings in Stripe
- Test the payment flows

Use the payment-links API or update directly in database.

