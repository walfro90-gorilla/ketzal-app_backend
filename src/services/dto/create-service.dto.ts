import { Prisma } from '@prisma/client';

export type ServiceDateRange = {
  availableFrom: string; // ISO date string
  availableTo: string;   // ISO date string
};

export class CreateServiceDto {
  name!: string;
  price!: number;
  supplierId!: number;
  description?: string;
  packs?: any;
  dates?: ServiceDateRange[]; // Nuevo campo para múltiples rangos de fechas
  // Add other fields as needed
}
