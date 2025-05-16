import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import serverlessExpress from 'serverless-http';
import { Handler, Context, APIGatewayEvent } from 'aws-lambda';

const expressApp = express();
let server: any;

async function bootstrap() {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
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
    await app.init();
    server = serverlessExpress(expressApp);
}

bootstrap();

export const handler = async (event: any, context: any) => {
    if (!server) {
        await bootstrap();
    }
    return server(event, context);
};
