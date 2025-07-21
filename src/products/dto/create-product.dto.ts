import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsArray, IsObject, IsPositive, Min } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ description: 'Product name', example: 'Mochila de Aventura Ketzal' })
  @IsString()
  name!: string;

  @ApiProperty({ description: 'Product description', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Price in MXN', example: 1299.99 })
  @IsNumber()
  @IsPositive()
  price!: number;

  @ApiProperty({ description: 'Price in AXO coins', required: false, example: 65.00 })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  priceAxo?: number;

  @ApiProperty({ description: 'Available stock', example: 50 })
  @IsNumber()
  @Min(0)
  stock!: number;

  @ApiProperty({ description: 'Main product image URL' })
  @IsString()
  image!: string;

  @ApiProperty({ description: 'Product category', example: 'travel-gear' })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({ description: 'Additional product images', required: false })
  @IsArray()
  @IsOptional()
  images?: string[];

  @ApiProperty({ description: 'Product specifications', required: false })
  @IsObject()
  @IsOptional()
  specifications?: {
    weight?: string;
    dimensions?: string;
    material?: string;
    capacity?: string;
    features?: string[];
  };

  @ApiProperty({ description: 'Product tags for filtering', required: false })
  @IsArray()
  @IsOptional()
  tags?: string[];
}