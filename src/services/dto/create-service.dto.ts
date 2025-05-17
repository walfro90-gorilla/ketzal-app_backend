import { Prisma } from '@prisma/client';

export class CreateServiceDto {
  name!: string;
  price!: number;
  supplierId!: number;
  description?: string;
  packs?: any;
  // Add other fields as needed
}
