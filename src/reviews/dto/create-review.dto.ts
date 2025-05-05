import { Prisma } from '@prisma/client';

export type CreateReviewDto = Omit<
  Prisma.ReviewCreateInput,
  'id' | 'createdAt' | 'updatedAt'
> & {
  packs: Prisma.NullableJsonNullValueInput | Prisma.InputJsonValue; // Permitir JSON o null
};
