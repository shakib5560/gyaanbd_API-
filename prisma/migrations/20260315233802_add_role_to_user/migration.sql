-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'TEACHERS', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" DEFAULT 'STUDENT';
