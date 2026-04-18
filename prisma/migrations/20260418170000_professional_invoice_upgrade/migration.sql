-- Professional invoice upgrade (non-destructive)

-- Add missing columns for invoices
ALTER TABLE "invoices" ADD COLUMN IF NOT EXISTS "invoiceNumber" TEXT;
ALTER TABLE "invoices" ADD COLUMN IF NOT EXISTS "projectId" TEXT;
ALTER TABLE "invoices" ADD COLUMN IF NOT EXISTS "representative" TEXT;
ALTER TABLE "invoices" ADD COLUMN IF NOT EXISTS "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "invoices" ADD COLUMN IF NOT EXISTS "dueDate" TIMESTAMP(3);
ALTER TABLE "invoices" ADD COLUMN IF NOT EXISTS "projectAddress" TEXT;
ALTER TABLE "invoices" ADD COLUMN IF NOT EXISTS "laborOnly" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "invoices" ADD COLUMN IF NOT EXISTS "laborOnlyNote" TEXT;
ALTER TABLE "invoices" ADD COLUMN IF NOT EXISTS "subtotal" DOUBLE PRECISION NOT NULL DEFAULT 0;
ALTER TABLE "invoices" ADD COLUMN IF NOT EXISTS "discountType" TEXT NOT NULL DEFAULT 'FIXED';
ALTER TABLE "invoices" ADD COLUMN IF NOT EXISTS "discountValue" DOUBLE PRECISION NOT NULL DEFAULT 0;
ALTER TABLE "invoices" ADD COLUMN IF NOT EXISTS "discount" DOUBLE PRECISION NOT NULL DEFAULT 0;
ALTER TABLE "invoices" ADD COLUMN IF NOT EXISTS "total" DOUBLE PRECISION NOT NULL DEFAULT 0;
ALTER TABLE "invoices" ADD COLUMN IF NOT EXISTS "amountPaid" DOUBLE PRECISION NOT NULL DEFAULT 0;
ALTER TABLE "invoices" ADD COLUMN IF NOT EXISTS "amountDue" DOUBLE PRECISION NOT NULL DEFAULT 0;
ALTER TABLE "invoices" ADD COLUMN IF NOT EXISTS "paymentStatus" TEXT NOT NULL DEFAULT 'UNPAID';

-- Ensure legacy amount column exists for compatibility snapshots
ALTER TABLE "invoices" ADD COLUMN IF NOT EXISTS "amount" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- Invoice items table (if missing in test DB)
CREATE TABLE IF NOT EXISTS "invoice_items" (
  "id" TEXT NOT NULL,
  "invoiceId" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "qty" DOUBLE PRECISION NOT NULL,
  "unit" TEXT NOT NULL,
  "price" DOUBLE PRECISION NOT NULL,
  "amount" DOUBLE PRECISION NOT NULL,
  "sequence" INTEGER NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "invoice_items_pkey" PRIMARY KEY ("id")
);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'invoice_items_invoiceId_fkey'
  ) THEN
    ALTER TABLE "invoice_items"
    ADD CONSTRAINT "invoice_items_invoiceId_fkey"
    FOREIGN KEY ("invoiceId") REFERENCES "invoices"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

-- Item catalog table for reusable item suggestions
CREATE TABLE IF NOT EXISTS "item_catalog" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "defaultUnit" TEXT NOT NULL,
  "suggestedPrice" DOUBLE PRECISION NOT NULL DEFAULT 0,
  "usageCount" INTEGER NOT NULL DEFAULT 0,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  "lastUsedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "item_catalog_pkey" PRIMARY KEY ("id")
);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'item_catalog_userId_fkey'
  ) THEN
    ALTER TABLE "item_catalog"
    ADD CONSTRAINT "item_catalog_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "users"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS "item_catalog_userId_description_defaultUnit_key"
ON "item_catalog"("userId", "description", "defaultUnit");

-- Backfill invoice number sequence from INV-1001 for rows missing invoiceNumber
WITH ordered AS (
  SELECT "id", ROW_NUMBER() OVER (ORDER BY "createdAt" ASC, "id" ASC) + 1000 AS seq
  FROM "invoices"
  WHERE "invoiceNumber" IS NULL
)
UPDATE "invoices" i
SET "invoiceNumber" = 'INV-' || ordered.seq::text
FROM ordered
WHERE i."id" = ordered."id";

CREATE UNIQUE INDEX IF NOT EXISTS "invoices_invoiceNumber_key"
ON "invoices"("invoiceNumber")
WHERE "invoiceNumber" IS NOT NULL;
