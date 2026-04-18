-- Drop the old unique constraint on email
DROP INDEX IF EXISTS "users_email_key";

-- Add phone column
ALTER TABLE "users" ADD COLUMN "phone" TEXT;

-- Make phone unique  
ALTER TABLE "users" ADD CONSTRAINT "users_phone_key" UNIQUE ("phone");

-- Make email nullable
ALTER TABLE "users" ALTER COLUMN "email" DROP NOT NULL;
