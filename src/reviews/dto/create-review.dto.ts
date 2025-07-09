import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateReviewDto {
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  rating!: number;

  @IsString()
  @IsNotEmpty()
  comment!: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  serviceId!: number;

  @IsString()
  @IsNotEmpty()
  userId!: string;

  @IsOptional()
  packs?: any; // Use 'any' for JSON fields
}
