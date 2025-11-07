# PT Lead Magnet - Professional PT Website Builder

A Next.js application for selling professional website packages to personal trainers with an integrated booking system, payment processing, and automated email notifications.

## Features

### 🎨 Marketing Website
- Modern, responsive landing page optimized for conversions
- Sections: Hero, Pain Points, Process, Showcases, About, Benefits, Testimonials, FAQ
- Capacity management system to control bookings
- Dark mode support

### 📋 Multi-Step Booking Form
- 3-step form collecting comprehensive client information
- Real-time validation with user-friendly error messages
- Progress indicator
- Professional UI with step icons

### 💳 Payment Processing
- Stripe integration for secure payments
- £59 one-time payment (configurable)
- Automatic capacity management after purchase
- Webhook handling for payment confirmation

### 📧 Email Notifications
- Automated email to `alexander.ptboost@gmail.com` after successful payment
- Professional HTML email template
- Includes all client information:
  - Personal details (name, email, phone)
  - Business information (name, location, specialization)
  - Website preferences (colors, goals, notes)
  - Payment details

## Quick Start

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Environment Variables

Create a `.env.local` file:

```env
# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here

# Resend (for email notifications)
RESEND_API_KEY=re_...

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 3. Run Development Server

```bash
pnpm dev
```

Visit `http://localhost:3000`

## Documentation

- **[SETUP_INSTRUCTIONS.md](./SETUP_INSTRUCTIONS.md)** - Complete setup guide for all services
- **[BOOKING_SYSTEM.md](./BOOKING_SYSTEM.md)** - Detailed documentation of the booking flow
- **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)** - Supabase configuration
- **[CAPACITY_SYSTEM_README.md](./CAPACITY_SYSTEM_README.md)** - Capacity management system

## Project Structure

```
pt-lead-magnet/
├── app/
│   ├── api/
│   │   ├── capacity/          # Capacity status API
│   │   ├── create-checkout/   # Stripe checkout session creation
│   │   ├── notify/            # Waitlist notification API
│   │   ├── send-booking-email/# Email notification API
│   │   └── stripe-webhook/    # Stripe webhook handler
│   ├── admin/                 # Admin dashboard
│   ├── success/               # Payment success page
│   └── page.tsx               # Main landing page
├── components/
│   ├── booking-form.tsx       # Multi-step booking form
│   ├── cta-section.tsx        # Call-to-action with capacity check
│   └── ui/                    # Reusable UI components
└── lib/
    ├── supabase.ts            # Supabase client
    └── utils.ts               # Utility functions
```

## Key Components

### Booking Form (`components/booking-form.tsx`)
Multi-step form that collects:
1. **Personal Info**: Name, email, phone
2. **Business Info**: Business name, location, specialization
3. **Preferences**: Colors, goals, additional notes

### CTA Section (`components/cta-section.tsx`)
- Opens booking form on button click
- Capacity checking before allowing bookings
- Waitlist signup when at capacity

### API Routes

#### `/api/create-checkout` (POST)
- Creates Stripe checkout session
- Stores form data in session metadata
- Returns checkout URL

#### `/api/send-booking-email` (POST)
- Sends formatted email via Resend
- Professional HTML template
- Includes all booking details

#### `/api/stripe-webhook` (POST)
- Handles `checkout.session.completed` event
- Triggers email notification
- Decrements capacity count

## Testing

### Test the Booking Flow

1. Click "Secure My £59 Website Now!"
2. Fill out the form with test data
3. Use Stripe test card: `4242 4242 4242 4242`
4. Exp: Any future date, CVC: Any 3 digits
5. Check email for booking notification

### Test Cards (Stripe)

- Success: `4242 4242 4242 4242`
- Declined: `4000 0000 0000 0002`
- 3D Secure: `4000 0025 0000 3155`

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI**: React 19, Tailwind CSS, Radix UI
- **Payments**: Stripe
- **Database**: Supabase
- **Email**: Resend
- **Hosting**: Netlify (configured)
- **TypeScript**: Full type safety

## Environment Setup

### Development
```bash
pnpm dev
```

### Production Build
```bash
pnpm build
pnpm start
```

### Linting
```bash
pnpm lint
```

## Production Deployment

### Netlify (Recommended)

The project includes `netlify.toml` configuration.

1. Connect repository to Netlify
2. Add environment variables in Netlify dashboard
3. Deploy!

### Environment Variables for Production

Ensure you set:
- `NEXT_PUBLIC_BASE_URL` to your production domain
- All Stripe keys (use live keys, not test)
- Resend with verified domain
- Supabase production credentials

### Stripe Webhook for Production

1. Create webhook in Stripe Dashboard
2. Point to: `https://yourdomain.com/api/stripe-webhook`
3. Select event: `checkout.session.completed`
4. Copy signing secret to `STRIPE_WEBHOOK_SECRET`

## Customization

### Change Price

Edit `app/api/create-checkout/route.ts`:
```typescript
unit_amount: 5900, // £59 in pence
```

### Change Email Recipient

Edit `app/api/send-booking-email/route.ts`:
```typescript
to: ['your-email@example.com'],
```

### Add Form Fields

1. Update `FormData` interface in `components/booking-form.tsx`
2. Add fields to relevant step render functions
3. Update validation in `validateStep()`
4. Add to metadata in `app/api/create-checkout/route.ts`
5. Update email template in `app/api/send-booking-email/route.ts`

## Support

For detailed setup instructions, see:
- [SETUP_INSTRUCTIONS.md](./SETUP_INSTRUCTIONS.md) - Complete setup guide
- [BOOKING_SYSTEM.md](./BOOKING_SYSTEM.md) - Booking system documentation

## License

Private project - All rights reserved

## Contact

Email: alexander.ptboost@gmail.com

