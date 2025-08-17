import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { NotificationsModule } from '../../src/notifications/notifications.module';
import { NotificationsService } from '../../src/notifications/notifications.service';

describe('Notifications API', () => {
  let app: INestApplication;
  const notificationsService = { findAll: () => Promise.resolve(['test']) };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [NotificationsModule],
    })
      .overrideProvider(NotificationsService)
      .useValue(notificationsService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET notifications`, async () => {
    const response = await request(app.getHttpServer())
      .get('/notifications')
      .expect(200)
    expect(response.body).toEqual(['test']);
  });

  afterAll(async () => {
    await app.close();
  });
});
