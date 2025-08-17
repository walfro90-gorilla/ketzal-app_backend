import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from '../../src/users/users.module';
import { UsersService } from '../../src/users/users.service';

describe('Users API', () => {
  let app: INestApplication;
  const usersService = { findAll: () => Promise.resolve(['test']) };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(UsersService)
      .useValue(usersService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET users`, async () => {
    const response = await request(app.getHttpServer())
      .get('/users')
      .expect(200)
    expect(response.body).toEqual(['test']);
  });

  afterAll(async () => {
    await app.close();
  });
});