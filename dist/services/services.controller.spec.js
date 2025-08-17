"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const services_controller_1 = require("./services.controller");
const services_service_1 = require("./services.service");
const prisma_service_1 = require("../prisma/prisma.service");
describe('ServicesController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [services_controller_1.ServicesController],
            providers: [
                services_service_1.ServicesService,
                { provide: prisma_service_1.PrismaService, useValue: {} },
            ],
        }).compile();
        controller = module.get(services_controller_1.ServicesController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=services.controller.spec.js.map