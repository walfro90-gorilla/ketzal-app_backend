import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { SuppliersModule } from '../../src/suppliers/suppliers.module';
import { SuppliersService } from '../../src/suppliers/suppliers.service';

describe('Suppliers API', () => {
  let app: INestApplication;
  const suppliersService = { findAll: () => Promise.resolve(['test']) };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [SuppliersModule],
    })
      .overrideProvider(SuppliersService)
      .useValue(suppliersService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET suppliers`, async () => {
    const response = await request(app.getHttpServer())
      .get('/suppliers')
      .expect(200)
    expect(response.body).toEqual(['test']);
  });

  afterAll(async () => {
    await app.close();
  });
});
