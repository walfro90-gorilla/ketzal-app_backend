import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto);
  }

  @Get()
  findAll() {
    return this.reviewsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(+id);
  }

  // Métodos existentes para reviews por servicio
  @Get('/service/:serviceId')
  getReviews(@Param('serviceId') serviceId: string) {
    return this.reviewsService.getReviewsByService(Number(serviceId));
  }

  @Post('/service/:serviceId')
  createReview(
    @Param('serviceId') serviceId: string,
    @Body() body: { rating: number; comment: string; userId: number },
    @Req() req: any
  ) {
    // userId puede venir del body o del req.user si hay autenticación
    const userId = body.userId || req.user?.id;
    return this.reviewsService.createReview(Number(serviceId), userId, body.rating, body.comment);
  }
}
