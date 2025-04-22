"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const reviews_service_1 = require("./reviews.service");
describe('ReviewsService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [reviews_service_1.ReviewsService],
        }).compile();
        service = module.get(reviews_service_1.ReviewsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=reviews.service.spec.js.map