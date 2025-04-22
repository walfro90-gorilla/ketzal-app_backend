"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ReviewsService = class ReviewsService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    create(createReviewDto) {
        return this.prismaService.review.create({ data: createReviewDto });
    }
    findAll() {
        return this.prismaService.review.findMany();
    }
    async findOne(id) {
        const review = await this.prismaService.review.findUnique({ where: { id } });
        if (!review)
            throw new common_1.NotFoundException(`Review #${id} not found`);
        return review;
    }
    async update(id, updateReviewDto) {
        const updated = await this.prismaService.review.update({ where: { id }, data: updateReviewDto });
        if (!updated)
            throw new common_1.NotFoundException(`Review #${id} not found`);
        return updated;
    }
    async remove(id) {
        const deleted = await this.prismaService.review.delete({ where: { id } });
        if (!deleted)
            throw new common_1.NotFoundException(`Review #${id} not found`);
        return deleted;
    }
    getReviewsByService(serviceId) {
        return this.prismaService.review.findMany({ where: { serviceId } });
    }
    createReview(serviceId, userId, rating, comment) {
        return this.prismaService.review.create({
            data: { serviceId, userId, rating, comment },
        });
    }
};
exports.ReviewsService = ReviewsService;
exports.ReviewsService = ReviewsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReviewsService);
//# sourceMappingURL=reviews.service.js.map