-- FINAL RLS AUDIT — Sprint 3 M3
-- Run this to verify all policies are in place

-- 1. All RLS policies across CMS tables
SELECT tablename, policyname, cmd
FROM pg_policies
WHERE tablename IN (
  'customer',
  'sales',
  'salesdetail',
  'product',
  'pricehist',
  'user',
  'UserModule_Rights'
)
ORDER BY tablename, cmd;

-- 2. Hard delete check — must return 0 rows
SELECT tablename, policyname, cmd
FROM pg_policies
WHERE cmd = 'DELETE'
AND tablename IN ('sales', 'salesdetail', 'product', 'pricehist');

-- AUDIT RESULTS (Screenshot taken on: 2026-05-12)
-- Total policies found: 20
-- customer: INSERT x2, SELECT x2, UPDATE x3 = 7 policies
-- pricehist: SELECT x2 = 2 policies
-- product: SELECT x2 = 2 policies
-- sales: SELECT x2 = 2 policies
-- salesdetail: SELECT x2 = 2 policies
-- user: ALL x1, SELECT x1, UPDATE x1 = 3 policies
-- UserModule_Rights: ALL x1 = 1 policy
-- Hard delete check: 0 rows (PASSED)
-- Audit status: ALL CLEAR