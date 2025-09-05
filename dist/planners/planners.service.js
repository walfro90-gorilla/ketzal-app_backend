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
exports.PlannersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const create_planner_dto_1 = require("./dto/create-planner.dto");
let PlannersService = class PlannersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createPlanner(userId, createPlannerDto) {
        try {
            const planner = await this.prisma.travelPlanner.create({
                data: {
                    id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
                    userId,
                    name: createPlannerDto.name,
                    destination: createPlannerDto.destination,
                    startDate: createPlannerDto.startDate ? new Date(createPlannerDto.startDate) : null,
                    endDate: createPlannerDto.endDate ? new Date(createPlannerDto.endDate) : null,
                    status: createPlannerDto.status || create_planner_dto_1.PlannerStatusDto.PLANNING,
                    isPublic: createPlannerDto.isPublic || false,
                    shareCode: createPlannerDto.shareCode,
                    totalMXN: 0,
                    totalAxo: 0,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            });
            return planner;
        }
        catch (error) {
            throw new common_1.BadRequestException('Error creating planner: ' + (error.message || error));
        }
    }
    async getPlannersByUser(userId) {
        const planners = await this.prisma.travelPlanner.findMany({
            where: {
                userId,
            },
            orderBy: {
                updatedAt: 'desc',
            },
        });
        return planners;
    }
    async getPlannerById(id, userId, includeItems = false) {
        const planner = await this.prisma.travelPlanner.findFirst(Object.assign({ where: {
                id,
                userId,
            } }, (includeItems && {
            include: {
                PlannerItem: true,
            }
        })));
        if (!planner) {
            throw new common_1.NotFoundException('Planner not found or access denied');
        }
        return planner;
    }
    async updatePlanner(id, userId, updatePlannerDto) {
        const existingPlanner = await this.prisma.travelPlanner.findFirst({
            where: { id, userId },
        });
        if (!existingPlanner) {
            throw new common_1.NotFoundException('Planner not found or access denied');
        }
        try {
            const updated = await this.prisma.travelPlanner.update({
                where: { id },
                data: {
                    name: updatePlannerDto.name,
                    destination: updatePlannerDto.destination,
                    startDate: updatePlannerDto.startDate ? new Date(updatePlannerDto.startDate) : null,
                    endDate: updatePlannerDto.endDate ? new Date(updatePlannerDto.endDate) : null,
                    status: updatePlannerDto.status,
                    isPublic: updatePlannerDto.isPublic,
                    shareCode: updatePlannerDto.shareCode,
                    updatedAt: new Date(),
                },
            });
            return updated;
        }
        catch (error) {
            throw new common_1.BadRequestException('Error updating planner: ' + (error.message || error));
        }
    }
    async deletePlanner(id, userId) {
        const existingPlanner = await this.prisma.travelPlanner.findFirst({
            where: { id, userId },
        });
        if (!existingPlanner) {
            throw new common_1.NotFoundException('Planner not found or access denied');
        }
        try {
            await this.prisma.travelPlanner.delete({
                where: { id },
            });
            return { message: 'Planner deleted successfully' };
        }
        catch (error) {
            throw new common_1.BadRequestException('Error deleting planner: ' + (error.message || error));
        }
    }
    async addItemToPlanner(addItemDto, userId) {
        const planner = await this.prisma.travelPlanner.findFirst({
            where: {
                id: addItemDto.plannerId,
                userId,
            },
        });
        if (!planner) {
            throw new common_1.NotFoundException('Planner not found or access denied');
        }
        if (!addItemDto.serviceId && !addItemDto.productId) {
            throw new common_1.BadRequestException('Either serviceId or productId is required');
        }
        try {
            const item = await this.prisma.plannerItem.create({
                data: {
                    id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
                    plannerId: addItemDto.plannerId,
                    serviceId: addItemDto.serviceId,
                    productId: addItemDto.productId,
                    quantity: addItemDto.quantity,
                    priceMXN: addItemDto.priceMXN,
                    priceAxo: addItemDto.priceAxo,
                    selectedDate: addItemDto.selectedDate ? new Date(addItemDto.selectedDate) : null,
                    notes: addItemDto.notes,
                    createdAt: new Date(),
                },
            });
            await this.updatePlannerTotals(addItemDto.plannerId);
            return item;
        }
        catch (error) {
            throw new common_1.BadRequestException('Error adding item to planner: ' + (error.message || error));
        }
    }
    async removeItemFromPlanner(itemId, userId) {
        const item = await this.prisma.plannerItem.findFirst({
            where: {
                id: itemId,
                plannerId: userId,
            },
            include: {
                TravelPlanner: true,
            },
        });
        if (!item) {
            throw new common_1.NotFoundException('Item not found or access denied');
        }
        try {
            await this.prisma.plannerItem.delete({
                where: { id: itemId },
            });
            await this.updatePlannerTotals(item.plannerId);
            return { message: 'Item removed successfully' };
        }
        catch (error) {
            throw new common_1.BadRequestException('Error removing item: ' + (error.message || error));
        }
    }
    async updatePlannerTotals(plannerId) {
        const items = await this.prisma.plannerItem.findMany({
            where: { plannerId },
        });
        const totalMXN = items.reduce((sum, item) => sum + (item.priceMXN * item.quantity), 0);
        const totalAxo = items.reduce((sum, item) => sum + ((item.priceAxo || 0) * item.quantity), 0);
        await this.prisma.travelPlanner.update({
            where: { id: plannerId },
            data: {
                totalMXN,
                totalAxo,
                updatedAt: new Date(),
            },
        });
    }
    async getPlannerStats(id, userId) {
        var _a;
        const planner = await this.getPlannerById(id, userId, true);
        const totalItems = ((_a = planner.PlannerItem) === null || _a === void 0 ? void 0 : _a.length) || 0;
        const totalMXN = planner.totalMXN;
        const totalAxo = planner.totalAxo;
        const daysDifference = planner.startDate && planner.endDate
            ? Math.ceil((planner.endDate.getTime() - planner.startDate.getTime()) / (1000 * 60 * 60 * 24))
            : 0;
        const itemsByDate = (planner.PlannerItem || []).reduce((acc, item) => {
            if (item.selectedDate) {
                const dateKey = item.selectedDate.toISOString().split('T')[0];
                if (!acc[dateKey])
                    acc[dateKey] = [];
                acc[dateKey].push(item);
            }
            return acc;
        }, {});
        return {
            totalItems,
            totalMXN,
            totalAxo,
            daysPlanned: daysDifference,
            itemsByDate: Object.keys(itemsByDate).map(date => ({
                date,
                items: itemsByDate[date]
            }))
        };
    }
};
exports.PlannersService = PlannersService;
exports.PlannersService = PlannersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PlannersService);
//# sourceMappingURL=planners.service.js.map