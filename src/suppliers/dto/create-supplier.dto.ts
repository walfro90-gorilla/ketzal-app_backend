import { Prisma } from '@prisma/client';

export class CreateSupplierDto {
  name!: string;
  contactEmail!: string;
  phoneNumber?: string;
  address?: string;
  description?: string;
  imgLogo?: string;
  // Add other fields as needed
}