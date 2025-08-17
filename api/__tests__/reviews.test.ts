import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ReviewsModule } from '../../src/reviews/reviews.module';
import { ReviewsService } from '../../src/reviews/reviews.service';

describe('Reviews API', () => {
  let app: INestApplication;
  const reviewsService = { findAll: () => Promise.resolve(['test']) };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ReviewsModule],
    })
      .overrideProvider(ReviewsService)
      .useValue(reviewsService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET reviews`, async () => {
    const response = await request(app.getHttpServer())
      .get('/reviews')
      .expect(200)
    expect(response.body).toEqual(['test']);
  });

  afterAll(async () => {
    await app.close();
  });
});
