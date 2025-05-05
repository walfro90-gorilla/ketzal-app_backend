import { Prisma } from '@prisma/client';
export type createCategoryDto = Omit<Prisma.CategoriesCreateInput, 'id' | 'createdAt' | 'updatedAt'> & {
    packs: Prisma.NullableJsonNullValueInput | Prisma.InputJsonValue;
};
