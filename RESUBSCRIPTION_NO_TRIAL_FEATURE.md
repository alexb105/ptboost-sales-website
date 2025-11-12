# Resubscription Without Free Trial Feature

## Overview
Implemented separate payment link for users who are re-subscribing, ensuring they don't get another free trial. This prevents trial abuse and ensures fair pricing for returning customers.

## Date
November 12, 2025

## Problem
Users who cancel their subscription could re-subscribe and get another free trial, essentially gaming the system to get continuous free service. This results in lost revenue and isn't fair to paying customers.

## Solution
Created a separate Stripe payment link for re-subscriptions that charges immediately without a free trial. The system automatically detects if a user has been subscribed before and uses the appropriate payment link.

## What Was Changed

### 1. **Database Schema** (`DATABASE_MIGRATION_ADD_RESUBSCRIPTION_LINK.md`)

Added `resubscription_link` column to `payment_links` table:

```sql
ALTER TABLE payment_links 
ADD COLUMN resubscription_link TEXT;

UPDATE payment_links 
SET resubscription_link = 'https://buy.stripe.com/eVq00k1BE5dxfslcon0co07'
WHERE id = 1;
```

### 2. **API Endpoint** (`app/api/payment-links/route.ts`)

Updated to handle resubscription link:

**GET Response:**
```json
{
  "subscriptionLink": "url-with-free-trial",
  "resubscriptionLink": "url-without-trial",
  "buyoutLink": "url-for-buyout",
  "updatedAt": "timestamp"
}
```

**POST Request (Admin):**
```json
{
  "subscriptionLink": "url",
  "resubscriptionLink": "url",
  "buyoutLink": "url",
  "adminPassword": "password"
}
```

### 3. **Account Dashboard** (`app/account/page.tsx`)

Updated subscription logic:

```typescript
const handleSubscribe = () => {
  // If user has stripe_customer_id, they've been subscribed before
  const hasBeenSubscribedBefore = userData?.hasActiveSubscription
  const linkToUse = hasBeenSubscribedBefore 
    ? resubscriptionLink  // No free trial
    : subscriptionLink     // With free trial
    
  window.location.href = linkToUse
}
```

## How It Works

### Payment Link Selection Logic

```
┌─────────────────────────────────────┐
│  User clicks "Subscribe Now"        │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  Check: Does user have              │
│  stripe_customer_id?                │
└──────┬──────────────────────────────┘
       │
       ├─── YES ──▶ Use resubscriptionLink
       │           (No free trial, charge immediately)
       │
       └─── NO  ──▶ Use subscriptionLink
                   (With free trial for new users)
```

### Detection Method

**How we know if user has been subscribed before:**

1. User logs in to account dashboard
2. `verify-login` API checks for `stripe_customer_id` in bookings table
3. Returns `hasActiveSubscription: !!booking.stripe_customer_id`
4. If `hasActiveSubscription` is `true`, they have (or had) a Stripe subscription
5. Use resubscription link (no trial)

**Key Database Fields:**
- `stripe_customer_id` - If this exists, user has been subscribed before
- `subscribed` - Current subscription status (true/false)
- `payment_status` - Payment completion status

## User Scenarios

### Scenario 1: Brand New Customer
**Profile:**
- Never subscribed before
- No `stripe_customer_id` in database
- `hasActiveSubscription: false`

**Flow:**
1. Visits account page
2. Sees "NOT SUBSCRIBED" badge
3. Clicks "Subscribe Now"
4. Redirected to `subscriptionLink`
5. Gets **7-day free trial** (or whatever trial period you set)
6. After trial: £7.99/month

**Payment Link:** Regular subscription link (with trial)

---

### Scenario 2: Returning Customer (Re-subscribing)
**Profile:**
- Previously subscribed (has `stripe_customer_id`)
- Cancelled subscription (`subscribed: false`)
- `hasActiveSubscription: true` (indicates they have Stripe ID)

**Flow:**
1. Visits account page
2. Sees "NOT SUBSCRIBED" badge
3. Clicks "Subscribe Now"
4. Redirected to `resubscriptionLink`
5. **No free trial** - charged immediately
6. £7.99/month starts right away

**Payment Link:** Resubscription link (no trial)

---

### Scenario 3: Currently Subscribed
**Profile:**
- Active subscription
- `subscribed: true`
- `hasActiveSubscription: true`

**Flow:**
1. Visits account page
2. Sees "SUBSCRIBED" badge ✅
3. Sees "Request Cancellation" button
4. No "Subscribe Now" button (already subscribed)

**Payment Link:** N/A (already subscribed)

## Stripe Configuration

### Regular Subscription Link (New Customers)
**Product:** PT Website Subscription  
**Price:** £7.99/month  
**Trial:** 7 days (or your chosen period)  
**Link:** Set in `subscription_link` field  

**Configuration in Stripe:**
- Go to Products → Your subscription product
- Create Payment Link
- Enable "Free trial" → 7 days
- Copy payment link URL

---

### Resubscription Link (Returning Customers)
**Product:** PT Website Subscription (same product)  
**Price:** £7.99/month  
**Trial:** None ❌  
**Link:** `https://buy.stripe.com/eVq00k1BE5dxfslcon0co07`  

**Configuration in Stripe:**
- Go to Products → Your subscription product
- Create **another** Payment Link
- **Disable** "Free trial"
- Copy payment link URL
- Store in `resubscription_link` field

## Benefits

✅ **Prevents Trial Abuse** - Users can't cancel and re-subscribe for multiple trials  
✅ **Fair Pricing** - Returning users pay immediately, new users get trial  
✅ **Automatic Detection** - System knows who has subscribed before  
✅ **Revenue Protection** - No lost revenue from trial gaming  
✅ **Industry Standard** - Common practice for subscription services  
✅ **Transparent** - Users understand the pricing  

## Revenue Impact

### Without This Feature:
- User subscribes → Gets 7-day free trial
- Cancels after trial → Pays £0
- Re-subscribes → Gets **another** 7-day trial
- Repeats indefinitely → Never pays ❌

### With This Feature:
- User subscribes → Gets 7-day free trial
- Cancels after trial → Paid £0
- Re-subscribes → **No trial**, charged immediately ✅
- Pays £7.99/month → Revenue secured ✅

## Testing Scenarios

### Test 1: New Customer Path
1. Create new test customer (no previous subscription)
2. Go to account page (not subscribed)
3. Click "Subscribe Now"
4. Verify redirect to subscription link (with trial)
5. Check Stripe checkout shows free trial period
6. Complete payment
7. Verify subscription created

### Test 2: Returning Customer Path
1. Use existing customer with `stripe_customer_id`
2. Ensure `subscribed: false` (cancelled)
3. Go to account page
4. Click "Subscribe Now"
5. Verify redirect to resubscription link (no trial)
6. Check Stripe checkout shows **no trial**, immediate charge
7. Complete payment
8. Verify `subscribed: true` in database

### Test 3: Currently Subscribed User
1. User with `subscribed: true`
2. Go to account page
3. Verify sees "SUBSCRIBED" badge
4. Verify sees "Request Cancellation" button
5. Verify **no** "Subscribe Now" button

## Admin Configuration

### Setting Up Payment Links

**Option 1: Direct SQL**
```sql
UPDATE payment_links 
SET subscription_link = 'https://buy.stripe.com/YOUR_TRIAL_LINK',
    resubscription_link = 'https://buy.stripe.com/eVq00k1BE5dxfslcon0co07',
    buyout_link = 'https://buy.stripe.com/YOUR_BUYOUT_LINK'
WHERE id = 1;
```

**Option 2: Admin API**
```bash
curl -X POST https://ptboost.co.uk/api/payment-links \
  -H "Content-Type: application/json" \
  -d '{
    "subscriptionLink": "https://buy.stripe.com/YOUR_TRIAL_LINK",
    "resubscriptionLink": "https://buy.stripe.com/eVq00k1BE5dxfslcon0co07",
    "buyoutLink": "https://buy.stripe.com/YOUR_BUYOUT_LINK",
    "adminPassword": "YOUR_ADMIN_PASSWORD"
  }'
```

## Logging

The system logs which link is being used:

```javascript
console.log(`Using ${hasBeenSubscribedBefore ? 'resubscription' : 'subscription'} link:`, linkToUse)
```

Check browser console to verify correct link is selected.

## Edge Cases

### What if resubscription link is not configured?
- Falls back to regular subscription link
- User gets free trial (not ideal, but won't break)
- Toast error shown to contact support

### What if user never completed first payment?
- `stripe_customer_id` will be null
- Treated as new customer
- Gets free trial (correct behavior)

### What if user had multiple subscriptions?
- `stripe_customer_id` exists from any previous subscription
- Uses resubscription link (correct - they've had a trial before)

## Future Enhancements

1. **Track Trial Usage**
   - Add `has_used_trial` boolean field
   - More explicit than checking `stripe_customer_id`

2. **Grace Period**
   - Allow users who cancel to re-subscribe within X days and keep trial
   - Encourages quick returns

3. **Admin Override**
   - Allow admin to manually grant trial to returning users
   - Useful for customer service situations

4. **Multiple Trial Types**
   - Different trial lengths for different scenarios
   - Seasonal promotions with special trials

5. **Analytics**
   - Track new vs returning subscriber rates
   - Measure trial to paid conversion rates

## Troubleshooting

### User complains they didn't get a trial
**Check:**
1. Do they have `stripe_customer_id`? → They've subscribed before
2. Is `resubscription_link` configured? → Should be set
3. Browser console: Which link was used?

**Resolution:** Explain they've used their trial previously, but offer discount code if appropriate.

### Resubscription link not working
**Check:**
1. Link configured in database: `SELECT resubscription_link FROM payment_links`
2. Link is valid Stripe URL
3. Stripe payment link is active (not archived)
4. Payment link product is available

### Both users getting same link
**Check:**
1. `hasActiveSubscription` field being returned from API
2. Logic in `handleSubscribe()` function
3. Browser console logs

## Related Files

- `DATABASE_MIGRATION_ADD_RESUBSCRIPTION_LINK.md` - SQL migration
- `app/api/payment-links/route.ts` - Payment links API
- `app/account/page.tsx` - Account dashboard
- `app/api/verify-login/route.ts` - User authentication

## Summary

This feature ensures:
- **New customers** get a trial period to test the service
- **Returning customers** pay immediately (no second trial)
- **Automatic detection** based on Stripe customer ID
- **Revenue protection** from trial abuse

The implementation is seamless to users and requires minimal configuration. Simply create two Stripe payment links (one with trial, one without) and let the system handle the rest!

## Support

Questions about:
- Setting up Stripe payment links
- Testing the resubscription flow
- Customizing trial periods
- Troubleshooting issues

Just ask! 🚀

