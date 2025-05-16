"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const express_1 = require("express");
const serverless_http_1 = require("serverless-http");
const expressApp = (0, express_1.default)();
let server;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(expressApp));
    app.setGlobalPrefix('api');
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Cats example')
        .setDescription('The cats API description')
        .setVersion('1.0')
        .addTag('cats')
        .build();
    const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, documentFactory);
    app.enableCors();
    await app.init();
    server = (0, serverless_http_1.default)(expressApp);
}
bootstrap();
const handler = async (event, context) => {
    if (!server) {
        await bootstrap();
    }
    return server(event, context);
};
exports.handler = handler;
//# sourceMappingURL=main.js.map