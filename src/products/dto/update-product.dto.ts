import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';

export type  UpdateProductDto = Partial<CreateProductDto>; // 👈
