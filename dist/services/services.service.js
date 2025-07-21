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
exports.ServicesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ServicesService = class ServicesService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    create(createServiceDto) {
        return this.prismaService.service.create({ data: createServiceDto });
    }
    findAll() {
        return this.prismaService.service.findMany();
    }
    async findAllWithReviewStats() {
        const services = await this.prismaService.service.findMany();
        const servicesWithStats = await Promise.all(services.map(async (service) => {
            const reviews = await this.prismaService.review.findMany({
                where: { serviceId: service.id },
                select: { rating: true }
            });
            const totalReviews = reviews.length;
            const averageRating = totalReviews > 0
                ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
                : 0;
            return Object.assign(Object.assign({}, service), { rating: Math.round(averageRating * 10) / 10, reviewCount: totalReviews });
        }));
        return servicesWithStats;
    }
    async findOne(id) {
        if (typeof id !== 'number' || isNaN(id)) {
            throw new common_1.NotFoundException('A valid service id must be provided');
        }
        const serviceFound = await this.prismaService.service.findUnique({
            where: { id }
        });
        if (!serviceFound) {
            throw new common_1.NotFoundException(`Service #${id} not found`);
        }
        return serviceFound;
    }
    async update(id, updateServiceDto) {
        const updatedService = await this.prismaService.service.update({
            where: { id },
            data: updateServiceDto
        });
        if (!updatedService) {
            throw new common_1.NotFoundException(`Service #${id} not found`);
        }
        return updatedService;
    }
    async remove(id) {
        await this.findOne(id);
        const dependencies = await this.checkServiceDependencies(id);
        if (dependencies.hasReviews) {
            throw new common_1.ConflictException(`Cannot delete service. It has ${dependencies.reviewsCount} review(s) associated. Please remove the reviews first.`);
        }
        try {
            const deletedService = await this.prismaService.service.delete({
                where: { id }
            });
            console.log(`Service ${id} deleted successfully`);
            return deletedService;
        }
        catch (error) {
            console.error(`Error deleting service ${id}:`, error);
            throw new common_1.NotFoundException(`Service #${id} not found`);
        }
    }
    async checkServiceDependencies(serviceId) {
        const reviews = await this.prismaService.review.findMany({
            where: { serviceId },
            select: { id: true }
        });
        return {
            hasReviews: reviews.length > 0,
            reviewsCount: reviews.length
        };
    }
    async getServiceDependencies(serviceId) {
        return this.checkServiceDependencies(serviceId);
    }
    async findAllWithBusInfo(filters) {
        const { page, limit, search } = filters;
        const skip = (page - 1) * limit;
        const where = {};
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } }
            ];
        }
        const [services, total] = await Promise.all([
            this.prismaService.service.findMany({
                where,
                select: {
                    id: true,
                    name: true,
                    description: true,
                    createdAt: true,
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
            }),
            this.prismaService.service.count({ where })
        ]);
        const statsFormatted = {
            total,
            withTransport: 0,
            withoutTransport: total,
        };
        return {
            services,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
                hasNext: page * limit < total,
                hasPrev: page > 1,
            },
            stats: statsFormatted
        };
    }
    async getBusTransportConfig(id) {
        const service = await this.prismaService.service.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                description: true,
            }
        });
        return Object.assign(Object.assign({}, service), { hasBusTransport: false, busLayout: null, seatPricing: null, message: 'Transport configuration temporarily disabled' });
    }
    async updateBusTransportConfig(id, updateData) {
        const service = await this.findOne(id);
        return Object.assign(Object.assign({}, service), { message: 'Transport configuration update temporarily disabled' });
    }
};
exports.ServicesService = ServicesService;
exports.ServicesService = ServicesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ServicesService);
//# sourceMappingURL=services.service.js.map