import { Supplier } from '@prisma/client';
export type CreateSupplierDto = Omit<Supplier, 'id' | 'createdAt' | 'updatedAt'>;
