import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PlannersModule } from '../../src/planners/planners.module';
import { PlannersService } from '../../src/planners/planners.service';

describe('Planners API', () => {
  let app: INestApplication;
  const plannersService = { getPlannersByUser: () => Promise.resolve(['test']) };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [PlannersModule],
    })
      .overrideProvider(PlannersService)
      .useValue(plannersService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET planners`, async () => {
    const response = await request(app.getHttpServer())
      .get('/planners')
      .expect(200)
    expect(response.body).toEqual({ success: true, message: 'Planners retrieved successfully', data: ['test'] });
  });

  afterAll(async () => {
    await app.close();
  });
});