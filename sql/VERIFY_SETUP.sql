-- ============================================================================
-- VERIFICATION SCRIPT
-- ============================================================================
-- Run this script to verify your Supabase setup is complete and correct
-- ============================================================================

-- ============================================================================
-- 1. CHECK ALL TABLES EXIST
-- ============================================================================
SELECT 
  '✅ TABLES' as check_type,
  COUNT(*) as count,
  CASE 
    WHEN COUNT(*) >= 5 THEN '✅ PASS'
    ELSE '❌ FAIL - Missing tables'
  END as status
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_type = 'BASE TABLE'
  AND table_name IN ('bookings', 'capacity_status', 'payment_links', 'promo_settings', 'waiting_list');

-- List all tables
SELECT 
  'Table: ' || table_name as detail
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- ============================================================================
-- 2. CHECK CAPACITY_STATUS TABLE
-- ============================================================================
SELECT 
  '✅ CAPACITY STATUS' as check_type,
  'id=' || id || ', capacity=' || capacity_count as detail,
  CASE 
    WHEN id = 1 THEN '✅ PASS'
    ELSE '❌ FAIL'
  END as status
FROM capacity_status
LIMIT 1;

-- ============================================================================
-- 3. CHECK PAYMENT_LINKS TABLE
-- ============================================================================
SELECT 
  '✅ PAYMENT LINKS' as check_type,
  'id=' || id as detail,
  CASE 
    WHEN id = 1 AND subscription_link IS NOT NULL THEN '✅ PASS'
    WHEN id = 1 AND subscription_link IS NULL THEN '⚠️ WARNING - Update payment links'
    ELSE '❌ FAIL'
  END as status
FROM payment_links
LIMIT 1;

-- Show payment links (if they exist)
SELECT 
  subscription_link,
  resubscription_link,
  buyout_link,
  updated_at
FROM payment_links
WHERE id = 1;

-- ============================================================================
-- 4. CHECK BOOKINGS TABLE STRUCTURE
-- ============================================================================
SELECT 
  '✅ BOOKINGS COLUMNS' as check_type,
  COUNT(*) as column_count,
  CASE 
    WHEN COUNT(*) >= 20 THEN '✅ PASS'
    ELSE '❌ FAIL - Missing columns'
  END as status
FROM information_schema.columns
WHERE table_name = 'bookings'
  AND table_schema = 'public';

-- List all bookings columns
SELECT 
  'Column: ' || column_name || ' (' || data_type || ')' as detail
FROM information_schema.columns
WHERE table_name = 'bookings'
  AND table_schema = 'public'
ORDER BY ordinal_position;

-- ============================================================================
-- 5. CHECK INDEXES
-- ============================================================================
SELECT 
  '✅ INDEXES' as check_type,
  COUNT(*) as index_count,
  CASE 
    WHEN COUNT(*) >= 10 THEN '✅ PASS'
    ELSE '⚠️ WARNING - Some indexes may be missing'
  END as status
FROM pg_indexes
WHERE schemaname = 'public';

-- List all indexes
SELECT 
  'Index: ' || indexname || ' on ' || tablename as detail
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY tablename, indexname;

-- ============================================================================
-- 6. CHECK RLS POLICIES
-- ============================================================================
SELECT 
  '✅ RLS POLICIES' as check_type,
  COUNT(*) as policy_count,
  CASE 
    WHEN COUNT(*) >= 10 THEN '✅ PASS'
    ELSE '❌ FAIL - Missing policies'
  END as status
FROM pg_policies
WHERE schemaname = 'public';

-- List all policies by table
SELECT 
  'Policy: ' || policyname || ' on ' || tablename || ' (' || cmd || ')' as detail
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- ============================================================================
-- 7. CHECK RLS IS ENABLED
-- ============================================================================
SELECT 
  '✅ RLS ENABLED' as check_type,
  'Table: ' || tablename as detail,
  CASE 
    WHEN rowsecurity = true THEN '✅ PASS'
    ELSE '❌ FAIL - RLS not enabled'
  END as status
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN ('bookings', 'capacity_status', 'payment_links', 'promo_settings', 'waiting_list')
ORDER BY tablename;

-- ============================================================================
-- 8. CHECK FUNCTIONS
-- ============================================================================
SELECT 
  '✅ FUNCTIONS' as check_type,
  'Function: ' || proname as detail,
  '✅ EXISTS' as status
FROM pg_proc
JOIN pg_namespace ON pg_proc.pronamespace = pg_namespace.oid
WHERE pg_namespace.nspname = 'public'
  AND proname = 'handle_updated_at';

-- ============================================================================
-- 9. CHECK TRIGGERS
-- ============================================================================
SELECT 
  '✅ TRIGGERS' as check_type,
  'Trigger: ' || trigger_name || ' on ' || event_object_table as detail,
  '✅ EXISTS' as status
FROM information_schema.triggers
WHERE trigger_schema = 'public'
  AND trigger_name = 'set_updated_at';

-- ============================================================================
-- 10. CHECK STORAGE BUCKET (if accessible)
-- ============================================================================
-- Note: This query might fail if you haven't created the bucket yet
-- That's okay - just create the bucket manually in the dashboard

SELECT 
  '✅ STORAGE BUCKET' as check_type,
  'Bucket: ' || name as detail,
  CASE 
    WHEN public = true THEN '✅ PASS - Public bucket'
    ELSE '⚠️ WARNING - Bucket not public'
  END as status
FROM storage.buckets
WHERE name = 'order-images';

-- ============================================================================
-- 11. CHECK STORAGE POLICIES
-- ============================================================================
SELECT 
  '✅ STORAGE POLICIES' as check_type,
  COUNT(*) as policy_count,
  CASE 
    WHEN COUNT(*) >= 4 THEN '✅ PASS'
    ELSE '⚠️ WARNING - Missing storage policies'
  END as status
FROM pg_policies
WHERE schemaname = 'storage'
  AND tablename = 'objects';

-- List storage policies
SELECT 
  'Storage Policy: ' || policyname as detail
FROM pg_policies
WHERE schemaname = 'storage'
  AND tablename = 'objects'
ORDER BY policyname;

-- ============================================================================
-- SUMMARY
-- ============================================================================
SELECT 
  '========================================' as summary
UNION ALL
SELECT '✅ VERIFICATION COMPLETE'
UNION ALL
SELECT '========================================'
UNION ALL
SELECT 'Review the results above:'
UNION ALL
SELECT '- All checks should show ✅ PASS'
UNION ALL
SELECT '- If you see ❌ FAIL, review the setup scripts'
UNION ALL
SELECT '- If you see ⚠️ WARNING, check the notes'
UNION ALL
SELECT '========================================';

-- ============================================================================
-- QUICK STATS
-- ============================================================================
SELECT 
  '📊 DATABASE STATS' as info,
  '' as detail;

SELECT 'Total Bookings' as metric, COUNT(*)::TEXT as value FROM bookings
UNION ALL
SELECT 'Completed Bookings', COUNT(*)::TEXT FROM bookings WHERE payment_status = 'completed'
UNION ALL
SELECT 'Active Subscriptions', COUNT(*)::TEXT FROM bookings WHERE subscribed = true
UNION ALL
SELECT 'Website Owners', COUNT(*)::TEXT FROM bookings WHERE website_owned = true
UNION ALL
SELECT 'Waiting List Entries', COUNT(*)::TEXT FROM waiting_list
UNION ALL
SELECT 'Current Capacity', capacity_count::TEXT FROM capacity_status WHERE id = 1
UNION ALL
SELECT 'Promo Settings Saved', COUNT(*)::TEXT FROM promo_settings;

-- ============================================================================

