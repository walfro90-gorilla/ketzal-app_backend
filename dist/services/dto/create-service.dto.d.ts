import { Service } from '@prisma/client';
export type CreateServiceDto = Omit<Service, 'id' | 'createdAt' | 'updatedAt'>;
