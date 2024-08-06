/*
  Warnings:

  - Changed the type of `categories` on the `Component` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `tags` on the `Component` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Component" DROP COLUMN "categories",
ADD COLUMN     "categories" JSONB NOT NULL,
DROP COLUMN "tags",
ADD COLUMN     "tags" JSONB NOT NULL;
