/*
  Warnings:

  - The `categories` column on the `Component` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `tags` column on the `Component` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Component" DROP COLUMN "categories",
ADD COLUMN     "categories" TEXT[],
DROP COLUMN "tags",
ADD COLUMN     "tags" TEXT[];
