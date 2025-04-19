import { Prisma } from '@prisma/client';

export type CreateSupplierDto = Omit<
  Prisma.SupplierCreateInput,
  'id' | 'createdAt' | 'users' | 'services'
>;