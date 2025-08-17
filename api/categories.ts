import { NestFactory } from '@nestjs/core';
import { CategoriesModule } from '../src/categories/categories.module';
import { ValidationPipe } from '@nestjs/common';

// This function will be treated as a serverless function by Vercel
export default async function handler(req, res) {
  // Create a new NestJS application instance for each invocation,
  // but only with the CategoriesModule.
  const app = await NestFactory.create(CategoriesModule, {
    // Disable verbose logging for a cleaner serverless environment
    logger: ['error', 'warn'],
  });

  // Set the global prefix to /api, same as the original app
  app.setGlobalPrefix('api');

  // Apply global validation pipes
  app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
      transformOptions: {
          enableImplicitConversion: true,
      },
  }));

  // Enable CORS
  app.enableCors();

  // Initialize the app
  await app.init();

  // Get the underlying Express/Fastify instance and pass the request to it
  const instance = app.getHttpAdapter().getInstance();
  return instance(req, res);
}
