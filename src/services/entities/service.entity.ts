import { Prisma, Service as ServiceModel } from '@prisma/client';

export class Service implements Partial<ServiceModel> {
  id!: number;
  name!: string;
  price!: number;
  supplierId!: number;
  description?: string | null;
  dates?: Prisma.JsonValue;

  constructor(data: Partial<Service>) {
    Object.assign(this, data);
  }
}
