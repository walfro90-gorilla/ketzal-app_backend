import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ServicesModule } from '../../src/services/services.module';
import { ServicesService } from '../../src/services/services.service';

describe('Services API', () => {
  let app: INestApplication;
  const servicesService = { findAll: () => Promise.resolve(['test']) };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ServicesModule],
    })
      .overrideProvider(ServicesService)
      .useValue(servicesService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET services`, async () => {
    const response = await request(app.getHttpServer())
      .get('/services')
      .expect(200)
    expect(response.body).toEqual(['test']);
  });

  afterAll(async () => {
    await app.close();
  });
});
