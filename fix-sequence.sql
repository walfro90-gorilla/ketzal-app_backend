-- Reset the sequence for Supplier table
-- This migration will fix the auto-increment sequence issue

-- Reset the sequence to start from the correct value
SELECT setval(pg_get_serial_sequence('"Supplier"', 'id'), COALESCE(MAX(id), 1)) FROM "Supplier";

-- Alternative approach: Drop and recreate the sequence
-- ALTER TABLE "Supplier" DROP CONSTRAINT IF EXISTS "Supplier_pkey" CASCADE;
-- DROP SEQUENCE IF EXISTS "Supplier_id_seq" CASCADE;
-- CREATE SEQUENCE "Supplier_id_seq" START WITH 22;
-- ALTER TABLE "Supplier" ALTER COLUMN id SET DEFAULT nextval('"Supplier_id_seq"');
-- ALTER TABLE "Supplier" ADD CONSTRAINT "Supplier_pkey" PRIMARY KEY (id);
