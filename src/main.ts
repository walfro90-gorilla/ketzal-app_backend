import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { Request, Response } from "express";

async function bootstrap() {

    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');

    const config = new DocumentBuilder()
        .setTitle('Cats example')
        .setDescription('The cats API description')
        .setVersion('1.0')
        .addTag('cats')
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);

    app.enableCors();
    // Add health check endpoint using Express instance with proper types
    app.getHttpAdapter().getInstance().get('/health', (req: Request, res: Response) => res.send('ok'));
    // Endpoint de healthcheck en la raíz
    app.getHttpAdapter().getInstance().get('/', (req: Request, res: Response) => res.send('ok'));

    console.log('Antes de app.listen');
    await app.listen(process.env.PORT || 4000, '0.0.0.0');
    console.log('Después de app.listen');
}

bootstrap()
