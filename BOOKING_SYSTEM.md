# Multi-Step Booking Form System

This document explains the multi-step booking form and email notification system implemented in the PT Lead Magnet application.

## Overview

The application now includes a comprehensive booking flow that:
1. Collects detailed information from customers before payment
2. Saves booking data to Supabase
3. Redirects to Stripe payment link for payment processing
4. Retrieves booking data after successful payment
5. Sends a formatted email notification with all booking details to `ptboost.info@gmail.com`

## Architecture

**Using Stripe Payment Link** (not Checkout Sessions):
- Form data is saved to Supabase before payment
- Customer is redirected to static Stripe payment link
- After payment, success page retrieves data from Supabase by booking ID
- Email is sent with the retrieved booking data

## User Flow

### 1. Customer Clicks CTA Button

When a customer clicks "Secure My £59 Website Now!", a multi-step form dialog opens.

### 2. Multi-Step Form (3 Steps)

#### Step 1: Personal Information
- Full Name (required)
- Email Address (required)
- Phone Number (required)

#### Step 2: Business Information
- Business Name (required)
- Location (required)
- Specialization (required)

#### Step 3: Website Preferences
- Preferred Colors (optional)
- Main Website Goals (optional)
- Additional Notes (optional)

### 3. Form Validation

- Each step validates required fields before allowing the user to continue
- User-friendly error messages using toast notifications
- Progress indicator shows current step

### 4. Data Storage & Payment

After completing the form:
1. Data is sent to `/api/save-booking` endpoint
2. Booking record is created in Supabase with `payment_status = 'pending'`
3. Booking ID is stored in browser localStorage
4. User is redirected to Stripe payment link: `https://buy.stripe.com/28E3cwgwy9tN0xrgED0co02`
5. On successful payment, Stripe redirects to `/success` page

### 5. Post-Payment Processing

When user lands on success page:
1. Success page retrieves booking ID from localStorage
2. Calls `/api/complete-booking` endpoint with booking ID
3. API retrieves booking data from Supabase
4. Updates booking status to `completed`
5. Sends email to `ptboost.info@gmail.com` via Resend
6. Marks `email_sent = true` in Supabase
7. Shows success message to customer

## Technical Implementation

### Components

**`components/booking-form.tsx`**
- Multi-step form component with validation
- Progress indicator
- Responsive design
- Toast notifications for errors

**`components/cta-section.tsx`**
- Updated to open booking form dialog instead of direct Stripe redirect
- Maintains existing capacity checking functionality

### API Routes

**`app/api/save-booking/route.ts`** (new)
- Saves form data to Supabase `bookings` table
- Sets `payment_status = 'pending'`
- Returns booking ID to store in localStorage

**`app/api/complete-booking/route.ts`** (new)
- Retrieves booking data from Supabase by ID
- Updates `payment_status = 'completed'`
- Triggers email notification
- Marks `email_sent = true` after successful email

**`app/api/send-booking-email/route.ts`**
- Sends formatted HTML email via Resend
- Professional email template with all booking details
- Error handling with logging

**`app/api/stripe-webhook/route.ts`** (updated)
- Handles `checkout.session.completed` event
- Only handles capacity decrement (booking data now in Supabase)
- No longer extracts form data from metadata

### Email Template

The email includes:
- **Personal Information**: Name, email, phone
- **Business Information**: Business name, location, specialization
- **Website Preferences**: Colors, goals, notes
- **Payment Information**: Amount, status, session ID

## Configuration Required

### 1. Environment Variables

Add to your `.env.local` file:

```env
# Stripe (for webhook only)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Supabase (required for storing booking data)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here

# Resend API Key (required for email notifications)
RESEND_API_KEY=re_your_resend_api_key_here

# Base URL (for API calls)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 2. Supabase Setup

You MUST create the `bookings` table in Supabase. See [SUPABASE_BOOKINGS_SETUP.md](./SUPABASE_BOOKINGS_SETUP.md) for complete SQL setup.

Quick SQL:
```sql
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  business_name TEXT NOT NULL,
  location TEXT NOT NULL,
  specialization TEXT NOT NULL,
  preferred_colors TEXT,
  website_goals TEXT,
  additional_notes TEXT,
  payment_status TEXT DEFAULT 'pending',
  stripe_session_id TEXT,
  email_sent BOOLEAN DEFAULT FALSE
);
```

### 3. Stripe Payment Link

Configure your Stripe Payment Link success URL:
1. Go to [Stripe Dashboard → Payment Links](https://dashboard.stripe.com/payment-links)
2. Edit your payment link
3. Set Success URL to: `http://localhost:3000/success` (dev) or `https://yourdomain.com/success` (prod)

### Resend Setup

1. Create account at [resend.com](https://resend.com)
2. Get API key from Settings → API Keys
3. For production: verify your domain
4. Update "from" address in `send-booking-email/route.ts` with your verified domain

### Testing

For development:
- Resend requires verified email addresses
- Add `ptboost.info@gmail.com` as verified in Resend dashboard
- Or use a test email you have access to

For production:
- Verify your domain in Resend
- Update "from" address to use your domain
- No need for individual email verification

## Testing the Flow

1. Start the development server: `pnpm dev`
2. Click the CTA button
3. Fill out the form with test data
4. Use Stripe test card: `4242 4242 4242 4242`
5. Check `ptboost.info@gmail.com` for the booking notification email

## Error Handling

- Form validation errors show as toast notifications
- API errors are logged to console
- Email sending failures don't block webhook (payment still processes)
- Graceful fallbacks for missing optional data

## Customization

### Change Email Recipient

Edit `app/api/send-booking-email/route.ts`:

```typescript
to: ['your-email@example.com'],
```

### Change Email Template

Edit the HTML in `app/api/send-booking-email/route.ts` to customize:
- Colors and styling
- Layout and sections
- Content and formatting

### Change Form Fields

Edit `components/booking-form.tsx`:
- Add/remove fields in the `FormData` interface
- Update form steps in `renderStep1()`, `renderStep2()`, `renderStep3()`
- Update validation in `validateStep()`
- Update metadata in `app/api/create-checkout/route.ts`

### Change Price

Edit `app/api/create-checkout/route.ts`:

```typescript
unit_amount: 5900, // Change to desired amount in pence (e.g., 9900 = £99)
```

## Troubleshooting

### Form doesn't open
- Check console for errors
- Verify Dialog component is properly imported

### Email not received
- Check Resend API key is set
- Verify email is verified in Resend (dev) or domain is verified (prod)
- Check webhook logs for errors
- Check Resend dashboard logs

### Payment fails
- Verify Stripe keys are correct
- Check Stripe dashboard for errors
- Ensure webhook is configured correctly

### Validation errors
- Check form field names match FormData interface
- Verify validation logic in `validateStep()`

## Future Enhancements

Potential improvements:
- Add file upload for logos or images
- Add calendar integration for scheduling
- Send confirmation email to customer as well
- Store booking data in Supabase for admin dashboard
- Add SMS notifications via Twilio
- Add more form steps or customization options

