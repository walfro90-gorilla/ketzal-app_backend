import { ApiProperty } from '@nestjs/swagger';

export class Product {
  @ApiProperty({ description: 'Product ID' })
  id!: number;

  @ApiProperty({ description: 'Product name' })
  name!: string;

  @ApiProperty({ description: 'Product description' })
  description?: string;

  @ApiProperty({ description: 'Price in MXN' })
  price!: number;

  @ApiProperty({ description: 'Price in AXO coins' })
  priceAxo?: number;

  @ApiProperty({ description: 'Available stock' })
  stock!: number;

  @ApiProperty({ description: 'Main product image URL' })
  image!: string;

  @ApiProperty({ description: 'Product category' })
  category?: string;

  @ApiProperty({ description: 'Additional product images' })
  images?: string[];

  @ApiProperty({ description: 'Product specifications' })
  specifications?: {
    weight?: string;
    dimensions?: string;
    material?: string;
    capacity?: string;
    features?: string[];
  };

  @ApiProperty({ description: 'Product tags' })
  tags?: string[];

  @ApiProperty({ description: 'Creation date' })
  createdAt!: Date;

  @ApiProperty({ description: 'Last update date' })
  updatedAt!: Date;
}
