-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_transportProviderID_fkey" FOREIGN KEY ("transportProviderID") REFERENCES "Supplier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_hotelProviderID_fkey" FOREIGN KEY ("hotelProviderID") REFERENCES "Supplier"("id") ON DELETE SET NULL ON UPDATE CASCADE;
