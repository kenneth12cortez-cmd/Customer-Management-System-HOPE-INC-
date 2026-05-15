-- RLS on user table for Admin Module
ALTER TABLE "user" ENABLE ROW LEVEL SECURITY;

CREATE POLICY superadmin_full_access_user
ON "user" FOR ALL TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM "user"
    WHERE id = auth.uid()
    AND user_type = 'SUPERADMIN'
  )
);

CREATE POLICY admin_update_user
ON "user" FOR UPDATE TO authenticated
USING (user_type != 'SUPERADMIN')
WITH CHECK (user_type != 'SUPERADMIN');

CREATE POLICY authenticated_select_user
ON "user" FOR SELECT TO authenticated
USING (true);

-- RLS on UserModule_Rights
ALTER TABLE "UserModule_Rights" ENABLE ROW LEVEL SECURITY;

CREATE POLICY block_superadmin_rights_modification
ON "UserModule_Rights" FOR ALL TO authenticated
USING (
  NOT EXISTS (
    SELECT 1 FROM "user" u
    WHERE u.id = "UserModule_Rights".userid
    AND u.user_type = 'SUPERADMIN'
  )
  OR
  EXISTS (
    SELECT 1 FROM "user"
    WHERE id = auth.uid()
    AND user_type = 'SUPERADMIN'
  )
);