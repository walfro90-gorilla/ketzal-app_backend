import { Prisma } from '@prisma/client';

// Define el tipo CreateServiceDto basado en el modelo Service
export type CreateServiceDto = Omit<
  Prisma.ServiceCreateInput, // Usa el tipo generado por Prisma
  'id' | 'createdAt' | 'updatedAt'
> & {
  packs: Prisma.NullableJsonNullValueInput | Prisma.InputJsonValue ; // Permitir JSON o null
};
