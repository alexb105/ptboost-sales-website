-- Test Dummy Booking Data for PTBoost
-- Use this SQL to insert test customer data into your bookings table

-- Insert Completed Order (with Stripe customer ID)
INSERT INTO public.bookings (
  full_name,
  email,
  phone,
  business_name,
  location,
  specialization,
  preferred_colors,
  website_goals,
  additional_notes,
  images,
  payment_status,
  stripe_customer_id,
  email_sent,
  subscription_password,
  website_owned,
  created_at,
  updated_at
) VALUES (
  'Sarah Johnson',
  'sarah.johnson@example.com',
  '+44 7700 900123',
  'FitLife Personal Training',
  'London, UK',
  'Weight Loss & Strength Training',
  'Blue and Orange',
  'Attract more clients, showcase before/after transformations, online booking system',
  'Would love to include client testimonials and transformation photos',
  ARRAY[]::text[],
  'completed',
  'cus_test123456789',
  true,
  'ABC-123-XY',
  false,
  NOW() - INTERVAL '5 days',
  NOW() - INTERVAL '4 days'
);

-- Insert Pending Order (no payment yet)
INSERT INTO public.bookings (
  full_name,
  email,
  phone,
  business_name,
  location,
  specialization,
  preferred_colors,
  website_goals,
  additional_notes,
  images,
  payment_status,
  email_sent,
  subscription_password,
  created_at,
  updated_at
) VALUES (
  'Michael Chen',
  'michael.chen@example.com',
  '+44 7700 900456',
  'Elite Performance Coaching',
  'Manchester, UK',
  'Athletic Performance & Sports Conditioning',
  'Black and Red',
  'Professional online presence, client testimonials, easy contact form',
  'Need website live within 7 days for new client launch',
  ARRAY[]::text[],
  'pending',
  false,
  'DEF-456-UV',
  NOW() - INTERVAL '2 days',
  NOW() - INTERVAL '2 days'
);

-- Insert Another Completed Order (website owned)
INSERT INTO public.bookings (
  full_name,
  email,
  phone,
  business_name,
  location,
  specialization,
  preferred_colors,
  website_goals,
  additional_notes,
  images,
  payment_status,
  stripe_customer_id,
  email_sent,
  subscription_password,
  website_owned,
  created_at,
  updated_at
) VALUES (
  'Emma Williams',
  'emma.williams@example.com',
  '+44 7700 900789',
  'Transform Fitness Studio',
  'Birmingham, UK',
  'HIIT & Functional Training',
  'Purple and Gold',
  'Build trust with potential clients, showcase training methods, online booking',
  'Have lots of client success stories to share',
  ARRAY[]::text[],
  'completed',
  'cus_test987654321',
  true,
  'GHI-789-ZA',
  true,
  NOW() - INTERVAL '10 days',
  NOW() - INTERVAL '9 days'
);

-- Insert Pending Order with Images
INSERT INTO public.bookings (
  full_name,
  email,
  phone,
  business_name,
  location,
  specialization,
  preferred_colors,
  website_goals,
  additional_notes,
  images,
  payment_status,
  email_sent,
  subscription_password,
  created_at,
  updated_at
) VALUES (
  'James Thompson',
  'james.thompson@example.com',
  '+44 7700 900321',
  'Strength & Conditioning UK',
  'Leeds, UK',
  'Powerlifting & Strength Training',
  'Dark Grey and Orange',
  'Professional branding, client gallery, pricing packages',
  'Uploaded some gym photos and client transformation photos',
  ARRAY['https://example.com/image1.jpg', 'https://example.com/image2.jpg']::text[],
  'pending',
  false,
  'JKL-012-BC',
  NOW() - INTERVAL '1 day',
  NOW() - INTERVAL '1 day'
);

-- Insert Recent Completed Order
INSERT INTO public.bookings (
  full_name,
  email,
  phone,
  business_name,
  location,
  specialization,
  preferred_colors,
  website_goals,
  additional_notes,
  images,
  payment_status,
  stripe_customer_id,
  email_sent,
  subscription_password,
  website_owned,
  created_at,
  updated_at
) VALUES (
  'Olivia Brown',
  'olivia.brown@example.com',
  '+44 7700 900654',
  'Wellness & Movement',
  'Bristol, UK',
  'Yoga & Pilates',
  'Green and White',
  'Calming aesthetic, class schedules, online booking',
  'Want a peaceful, zen-like design',
  ARRAY[]::text[],
  'completed',
  'cus_test456789123',
  true,
  'MNO-345-DE',
  false,
  NOW() - INTERVAL '3 days',
  NOW() - INTERVAL '2 days'
);

-- Insert Failed Payment Order
INSERT INTO public.bookings (
  full_name,
  email,
  phone,
  business_name,
  location,
  specialization,
  preferred_colors,
  website_goals,
  additional_notes,
  images,
  payment_status,
  email_sent,
  subscription_password,
  created_at,
  updated_at
) VALUES (
  'David Martinez',
  'david.martinez@example.com',
  '+44 7700 900987',
  'Boxing Fitness Academy',
  'Liverpool, UK',
  'Boxing & Combat Sports',
  'Red and Black',
  'Tough, professional look, showcase training intensity',
  'Payment failed - need to retry',
  ARRAY[]::text[],
  'failed',
  false,
  'PQR-678-FG',
  NOW() - INTERVAL '7 days',
  NOW() - INTERVAL '7 days'
);

-- Verify the data was inserted
SELECT 
  id,
  full_name,
  email,
  business_name,
  location,
  payment_status,
  created_at
FROM public.bookings
ORDER BY created_at DESC;

