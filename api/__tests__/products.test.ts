import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ProductsModule } from '../../src/products/products.module';
import { ProductsService } from '../../src/products/products.service';

describe('Products API', () => {
  let app: INestApplication;
  const productsService = { findAll: () => Promise.resolve(['test']) };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ProductsModule],
    })
      .overrideProvider(ProductsService)
      .useValue(productsService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET products`, async () => {
    const response = await request(app.getHttpServer())
      .get('/products')
      .expect(200)
    expect(response.body).toEqual(['test']);
  });

  afterAll(async () => {
    await app.close();
  });
});
