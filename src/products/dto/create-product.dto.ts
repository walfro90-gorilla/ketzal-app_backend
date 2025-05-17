import { Product } from '@prisma/client';

export class CreateProductDto {
  name!: string;
  description?: string;
  price!: number;
  stock!: number;
  image?: string;
}