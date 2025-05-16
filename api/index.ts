import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import serverlessExpress from 'serverless-http';

const expressApp = express();
let server: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
  app.setGlobalPrefix('api');
  app.enableCors();
  await app.init();
  server = serverlessExpress(expressApp);
}

export default async function handler(req: any, res: any) {
  if (!server) {
    await bootstrap();
  }
  return server(req, res);
}
