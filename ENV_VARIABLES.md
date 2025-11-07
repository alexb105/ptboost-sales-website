# Environment Variables Setup

Create a `.env.local` file in the root of your project with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Admin Password
ADMIN_PASSWORD=your_secure_admin_password

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx

# Resend API (existing)
RESEND_API_KEY=your_resend_api_key
```

## Getting Supabase Credentials

1. Create a free account at [https://app.supabase.com](https://app.supabase.com)
2. Create a new project
3. Go to Project Settings → API
4. Copy the **Project URL** and **anon/public key**

## Important Notes

- Never commit `.env.local` to Git
- The `ADMIN_PASSWORD` can be any secure password you choose
- After adding environment variables, restart your development server

For complete setup instructions, see `SUPABASE_SETUP.md`

