-- CreateEnum
CREATE TYPE "OtpPurpose" AS ENUM ('VERIFICATION', 'RESET_PASSWORD');

-- AlterTable
ALTER TABLE "EmailOtp" ADD COLUMN     "purpose" "OtpPurpose" NOT NULL DEFAULT 'VERIFICATION';
