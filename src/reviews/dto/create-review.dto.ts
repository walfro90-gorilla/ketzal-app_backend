import { Prisma } from '@prisma/client';

export class CreateReviewDto {
  rating!: number;
  comment!: string;
  serviceId!: number;
  userId!: string;
  packs?: any; // Use 'any' for JSON fields
}
