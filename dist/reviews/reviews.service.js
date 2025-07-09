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
        const { rating, comment, serviceId, userId } = createReviewDto;
        if (!rating || !comment || !serviceId || !userId) {
            throw new Error('Missing required fields: rating, comment, serviceId, userId');
        }
        return this.prismaService.review.create({
            data: {
                rating: Number(rating),
                comment,
                serviceId: Number(serviceId),
                userId
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        image: true
                    }
                },
                service: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });
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
        return this.prismaService.review.findMany({
            where: { serviceId },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        image: true
                    }
                }
            }
        });
    }
    async getReviewStatsForService(serviceId) {
        const reviews = await this.prismaService.review.findMany({
            where: { serviceId },
            select: {
                rating: true
            }
        });
        const totalReviews = reviews.length;
        const averageRating = totalReviews > 0
            ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
            : 0;
        return {
            totalReviews,
            averageRating: Math.round(averageRating * 10) / 10,
            serviceId
        };
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