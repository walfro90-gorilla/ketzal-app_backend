import { Prisma } from '@prisma/client';

export class CreateCategoryDto {
  name!: string;
  image?: string;
  description?: string;
}