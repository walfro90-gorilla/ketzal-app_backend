"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: false,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Ketzal app API')
        .setDescription('The Ketzal app API description')
        .setVersion('1.0')
        .addTag('cats')
        .build();
    const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, documentFactory);
    app.enableCors();
    app.getHttpAdapter().getInstance().get('/health', (req, res) => res.send('ok'));
    app.getHttpAdapter().getInstance().get('/', (req, res) => res.send('ok'));
    console.log('Antes de app.listen');
    await app.listen(process.env.PORT || 4000, '0.0.0.0');
    console.log('Después de app.listen');
}
bootstrap();
//# sourceMappingURL=main.js.map