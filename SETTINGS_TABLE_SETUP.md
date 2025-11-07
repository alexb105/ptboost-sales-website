# Settings Table Setup

This table stores admin-configurable settings like the package price.

## Create the Settings Table in Supabase

1. Go to your Supabase project: https://supabase.com/dashboard
2. Click on **SQL Editor** in the left sidebar
3. Click **"New Query"**
4. Paste the following SQL and click **Run**:

```sql
-- Create settings table
CREATE TABLE IF NOT EXISTS settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access to settings"
  ON settings
  FOR SELECT
  USING (true);

-- Create policy to allow service role full access (for API updates)
CREATE POLICY "Allow service role full access to settings"
  ON settings
  FOR ALL
  USING (true);

-- Insert default price
INSERT INTO settings (key, value)
VALUES ('package_price', '2997')
ON CONFLICT (key) DO NOTHING;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_settings_key ON settings(key);
```

## Table Structure

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `key` | TEXT | Setting key (unique) |
| `value` | TEXT | Setting value |
| `updated_at` | TIMESTAMP | Last update time |
| `created_at` | TIMESTAMP | Creation time |

## Usage

The `package_price` setting controls the price shown in Stripe checkout.

- **Key**: `package_price`
- **Value**: Price in pounds (e.g., "2997" for £2997)
- **Updated via**: Admin dashboard at `/admin`

## Security

- **Read**: Public (anyone can read settings)
- **Write**: Protected by admin password (set in `.env.local`)

## Admin Password

Make sure to set your admin password in your environment variables:

### Local (.env.local)
```
ADMIN_PASSWORD=your-secure-password-here
```

### Netlify (Production)
1. Go to https://app.netlify.com
2. Site configuration → Environment variables
3. Add: `ADMIN_PASSWORD` = `your-secure-password-here`


