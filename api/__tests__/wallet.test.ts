import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { WalletModule } from '../../src/wallet/wallet.module';
import { WalletService } from '../../src/wallet/wallet.service';

describe('Wallet API', () => {
  let app: INestApplication;
  const walletService = { getOrCreateWallet: () => Promise.resolve({ id: '1', balance: 100 }) };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [WalletModule],
    })
      .overrideProvider(WalletService)
      .useValue(walletService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET wallet/:userId`, async () => {
    const response = await request(app.getHttpServer())
      .get('/wallet/1')
      .expect(200)
    expect(response.body).toEqual({ success: true, wallet: { id: '1', balance: 100 } });
  });

  afterAll(async () => {
    await app.close();
  });
});
