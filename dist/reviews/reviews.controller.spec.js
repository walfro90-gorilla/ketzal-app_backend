"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const reviews_controller_1 = require("./reviews.controller");
const reviews_service_1 = require("./reviews.service");
describe('ReviewsController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [reviews_controller_1.ReviewsController],
            providers: [reviews_service_1.ReviewsService],
        }).compile();
        controller = module.get(reviews_controller_1.ReviewsController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=reviews.controller.spec.js.map