import { Prisma } from '@prisma/client';

export type CreateCategoryDto = Omit<
  Prisma.CategoriesCreateInput,
  'id' | 'createdAt' | 'updatedAt'
>;