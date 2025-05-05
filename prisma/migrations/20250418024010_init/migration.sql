/*
  Warnings:

  - The `hotelProviderID` column on the `Service` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `transportProviderID` column on the `Service` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Service" DROP COLUMN "hotelProviderID",
ADD COLUMN     "hotelProviderID" INTEGER,
DROP COLUMN "transportProviderID",
ADD COLUMN     "transportProviderID" INTEGER;
