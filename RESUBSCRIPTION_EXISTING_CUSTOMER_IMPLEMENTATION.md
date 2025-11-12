# Resubscription with Existing Customer ID Implementation

## Overview
When users re-subscribe, the system now creates a dynamic Stripe Checkout Session that **reuses their existing Stripe customer ID**. This prevents duplicate customers in Stripe and maintains payment history.

## Date
November 12, 2025

## Problem Solved

### ❌ Previous Issue:
- Static payment links create **new** Stripe customers every time
- User subscribes → Customer ID: `cus_ABC123`
- User cancels → Customer ID: `cus_ABC123` still exists
- User re-subscribes via payment link → Creates **new** customer: `cus_XYZ789` ❌
- Result: Duplicate customers, lost payment history, messy Stripe dashboard

### ✅ New Solution:
- User subscribes → Customer ID: `cus_ABC123` (stored in database)
- User cancels → Customer ID: `cus_ABC123` still in database
- User re-subscribes → Creates checkout session **using** `cus_ABC123` ✅
- Result: Same customer, payment history maintained, clean records

---

## What Was Implemented

### 1. **New API Endpoint** (`app/api/create-resubscribe-session/route.ts`)

Creates a Stripe Checkout Session for returning customers.

**Endpoint:** `POST /api/create-resubscribe-session`

**Request:**
```json
{
  "email": "user@example.com",
  "password": "XXX-XXX-XX"
}
```

**Process:**
1. Verify user credentials (email + subscription password)
2. Fetch booking with `stripe_customer_id`
3. Create Stripe Checkout Session with **existing customer ID**
4. Return checkout session URL

**Response:**
```json
{
  "sessionUrl": "https://checkout.stripe.com/c/pay/...",
  "sessionId": "cs_test_..."
}
```

**Key Features:**
- ✅ Uses existing `stripe_customer_id` (no duplicate customers)
- ✅ No free trial (price ID controls this)
- ✅ Maintains payment methods on file
- ✅ Preserves customer history
- ✅ Metadata tracks this as a resubscription

### 2. **Updated Account Page** (`app/account/page.tsx`)

Modified `handleSubscribe()` function to:

**For New Customers** (no `stripe_customer_id`):
- Use static subscription link
- Gets free trial
- Creates new Stripe customer

**For Returning Customers** (has `stripe_customer_id`):
- Call `/api/create-resubscribe-session`
- Get dynamic checkout URL
- Redirect to checkout
- Reuses existing Stripe customer ✅

---

## Configuration Required

### 1. **Stripe Price ID** (Environment Variable)

Add this to your `.env.local`:

```bash
STRIPE_SUBSCRIPTION_PRICE_ID=price_1234567890abcdef
```

**How to get the Price ID:**

1. Go to Stripe Dashboard → **Products**
2. Click your PT Website Subscription product
3. In the **Pricing** section, you'll see your prices
4. For the monthly £7.99 subscription (without trial), click to view details
5. Copy the **Price ID** (starts with `price_`)

**Example:**
```
Price ID: price_1QMN9SKjqM8L2VGihvZ8hLwW
```

### 2. **Verify Existing Environment Variables**

Make sure you have:
```bash
STRIPE_SECRET_KEY=sk_test_... or sk_live_...
NEXT_PUBLIC_SITE_URL=https://ptboost.co.uk
RESEND_API_KEY=re_...
```

---

## How It Works

### Resubscription Flow Diagram

```
┌─────────────────────────────────┐
│  User clicks "Subscribe Now"    │
└────────────┬────────────────────┘
             │
             ▼
    ┌────────────────────┐
    │ Has stripe_customer_id? │
    └────┬────────────┬────┘
         │            │
      YES│            │NO
         │            │
         ▼            ▼
┌─────────────────┐  ┌─────────────────┐
│ Call API:       │  │ Use static      │
│ create-         │  │ subscription    │
│ resubscribe-    │  │ payment link    │
│ session         │  │ (with trial)    │
└────┬────────────┘  └────┬────────────┘
     │                    │
     ▼                    ▼
┌─────────────────┐  ┌─────────────────┐
│ Create Checkout │  │ New customer    │
│ with existing   │  │ created         │
│ customer ID     │  │                 │
└────┬────────────┘  └────┬────────────┘
     │                    │
     ▼                    ▼
┌─────────────────────────────────┐
│  Redirect to Stripe Checkout    │
└─────────────────────────────────┘
```

### Code Flow

```typescript
// account/page.tsx - handleSubscribe()

const hasBeenSubscribedBefore = userData?.hasActiveSubscription

if (hasBeenSubscribedBefore) {
  // Returning customer
  const response = await fetch('/api/create-resubscribe-session', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  })
  
  const { sessionUrl } = await response.json()
  window.location.href = sessionUrl // Redirect to checkout
  
} else {
  // New customer
  window.location.href = subscriptionLink // Static link with trial
}
```

---

## Stripe Customer ID Flow

### First Subscription
```
1. User fills booking form
2. Redirected to Stripe (new customer created)
3. Payment completes
4. Stripe creates: cus_ABC123
5. Webhook fires → stripe_customer_id saved to database
6. User has active subscription
```

### Cancellation
```
1. User requests cancellation
2. Admin unsubscribes user
3. subscribed = false in database
4. stripe_customer_id = "cus_ABC123" (still exists)
5. User receives cancellation email
```

### Resubscription (NEW)
```
1. User clicks "Subscribe Now"
2. System detects stripe_customer_id exists
3. API creates checkout with customer: "cus_ABC123" ✅
4. User redirected to Stripe Checkout
5. Payment completed
6. Subscription created for existing customer
7. subscribed = true in database
8. Same customer ID maintained! ✅
```

---

## Benefits

✅ **No Duplicate Customers** - Reuses existing Stripe customer ID  
✅ **Payment History Maintained** - All transactions under one customer  
✅ **Saved Payment Methods** - Customer can use saved cards  
✅ **Clean Stripe Dashboard** - No clutter from duplicate customers  
✅ **Better Analytics** - Track customer lifetime value accurately  
✅ **Professional** - Industry-standard approach  
✅ **Seamless UX** - User doesn't see any difference  

---

## Comparison

### Before (Static Payment Link)

| Subscription | Customer ID | Problem |
|--------------|-------------|---------|
| First time | `cus_ABC123` | ✅ OK |
| Re-subscribe | `cus_XYZ789` | ❌ New customer! |
| Re-subscribe again | `cus_DEF456` | ❌ Another new one! |

**Result:** 3 customer records for 1 user ❌

### After (Dynamic Checkout Session)

| Subscription | Customer ID | Status |
|--------------|-------------|---------|
| First time | `cus_ABC123` | ✅ OK |
| Re-subscribe | `cus_ABC123` | ✅ Same customer |
| Re-subscribe again | `cus_ABC123` | ✅ Same customer |

**Result:** 1 customer record maintained ✅

---

## Testing

### Test Scenario 1: New Customer
1. Create new test user (no previous subscription)
2. Log in to account
3. Click "Subscribe Now"
4. Should redirect to subscription payment link (with trial)
5. Complete payment
6. Check Stripe: New customer created
7. Check database: `stripe_customer_id` saved

### Test Scenario 2: Returning Customer
1. Use existing user with `stripe_customer_id`
2. Ensure `subscribed: false` (cancelled)
3. Log in to account
4. Click "Subscribe Now"
5. **Should call API** (check console logs)
6. **Should redirect to Stripe Checkout** (not payment link)
7. Complete payment
8. Check Stripe: **Same customer ID used** ✅
9. Check database: `subscribed: true`

### Verification

**In Browser Console:**
```javascript
// New customer:
console.log('Using subscription link (new customer with trial):', link)

// Returning customer:
console.log('Redirecting to resubscription checkout (existing customer):', url)
```

**In Stripe Dashboard:**
1. Go to Customers → Find customer
2. Check subscriptions tab
3. Should see all subscriptions for same customer ID
4. No duplicate customer records ✅

---

## Webhook Integration

To fully automate, ensure your Stripe webhook handles:

```typescript
// stripe-webhook/route.ts

case 'checkout.session.completed':
  if (session.metadata?.type === 'resubscription') {
    // Update database
    await supabase
      .from('bookings')
      .update({ subscribed: true })
      .eq('id', session.metadata.booking_id)
  }
  break
```

---

## Error Handling

### Common Errors & Solutions

**Error:** "STRIPE_SUBSCRIPTION_PRICE_ID not configured"
- **Solution:** Add price ID to environment variables

**Error:** "No Stripe customer ID found"
- **Solution:** User never completed first payment, treat as new customer

**Error:** "Failed to create checkout session"
- **Solution:** Check Stripe API key, verify price ID is correct

**Error:** "Subscription link not configured"
- **Solution:** Set subscription link in payment_links table

---

## Security

✅ **Password Verification** - Requires subscription password  
✅ **Email Verification** - Matches email to booking  
✅ **Existing Customer Only** - Only works if `stripe_customer_id` exists  
✅ **Metadata Tracking** - Logs this as a resubscription  
✅ **Session Expiration** - Checkout sessions expire after 24 hours  

---

## Environment Variables Summary

```bash
# Required for resubscription
STRIPE_SUBSCRIPTION_PRICE_ID=price_... # Monthly subscription price (no trial)

# Existing required variables
STRIPE_SECRET_KEY=sk_...
NEXT_PUBLIC_SITE_URL=https://ptboost.co.uk
RESEND_API_KEY=re_...
ADMIN_PASSWORD=your_password
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

---

## Stripe Dashboard Setup

### 1. Create Price (Without Trial)

1. Go to Products → Your subscription product
2. Click **Add another price**
3. Configure:
   - Billing period: **Monthly**
   - Price: **£7.99**
   - Trial period: **None** ❌
4. Save and copy the **Price ID**
5. Add to environment variables

### 2. Verify Webhook

Make sure your webhook listens for:
- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`

---

## Related Files

- `app/api/create-resubscribe-session/route.ts` - New API endpoint
- `app/account/page.tsx` - Updated subscription logic
- `app/api/stripe-webhook/route.ts` - Handles subscription events
- `lib/supabase-types.ts` - BookingData type definition

---

## Migration Path

If you already have users with duplicate customers:

1. **Identify duplicates:**
```sql
SELECT email, COUNT(*) 
FROM bookings 
WHERE stripe_customer_id IS NOT NULL 
GROUP BY email 
HAVING COUNT(*) > 1;
```

2. **Manually merge in Stripe** (if needed)
3. **Update database to use primary customer ID**
4. **Going forward, system prevents duplicates** ✅

---

## Future Enhancements

1. **Customer Portal Integration**
   - Let users manage subscriptions via Stripe portal
   - Update payment methods
   - View invoices

2. **Grace Period**
   - Allow quick resubscription within X days
   - Keep same billing cycle

3. **Prorated Billing**
   - If user re-subscribes mid-cycle
   - Credit for unused time

4. **Subscription Tiers**
   - Different price points
   - Multiple products

---

## Summary

This implementation ensures that:

- **New customers** → Use static payment link (with trial)
- **Returning customers** → Dynamic checkout (existing customer ID, no trial)
- **No duplicates** → One customer record per user
- **Clean records** → Professional Stripe dashboard
- **Better UX** → Saved payment methods work

The system intelligently detects subscription history and routes users to the appropriate checkout flow automatically!

## Support

Questions about:
- Setting up Stripe price ID
- Testing resubscription flow
- Handling edge cases
- Webhook configuration

Just ask! 🚀

