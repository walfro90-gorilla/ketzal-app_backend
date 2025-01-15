import { Prisma } from '@prisma/client';
export type CreateServiceDto = Omit<Prisma.ServiceCreateInput, 'id' | 'createdAt' | 'updatedAt'> & {
    packs: Prisma.NullableJsonNullValueInput | Prisma.InputJsonValue;
};
