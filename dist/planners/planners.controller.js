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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlannersController = void 0;
const common_1 = require("@nestjs/common");
const planners_service_1 = require("./planners.service");
const create_planner_dto_1 = require("./dto/create-planner.dto");
const update_planner_dto_1 = require("./dto/update-planner.dto");
const add_item_to_planner_dto_1 = require("./dto/add-item-to-planner.dto");
let PlannersController = class PlannersController {
    constructor(plannersService) {
        this.plannersService = plannersService;
    }
    async createPlanner(createPlannerDto, req) {
        var _a;
        const userId = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) || 'test-user-id';
        const planner = await this.plannersService.createPlanner(userId, createPlannerDto);
        return {
            success: true,
            message: 'Planner created successfully',
            data: planner,
        };
    }
    async getUserPlanners(req) {
        var _a;
        const userId = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) || 'test-user-id';
        const planners = await this.plannersService.getPlannersByUser(userId);
        return {
            success: true,
            message: 'Planners retrieved successfully',
            data: planners,
        };
    }
    async getPlannerById(id, req) {
        var _a;
        const userId = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) || 'test-user-id';
        const planner = await this.plannersService.getPlannerById(id, userId);
        return {
            success: true,
            message: 'Planner retrieved successfully',
            data: planner,
        };
    }
    async updatePlanner(id, updatePlannerDto, req) {
        var _a;
        const userId = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) || 'test-user-id';
        const updatedPlanner = await this.plannersService.updatePlanner(id, userId, updatePlannerDto);
        return {
            success: true,
            message: 'Planner updated successfully',
            data: updatedPlanner,
        };
    }
    async deletePlanner(id, req) {
        var _a;
        const userId = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) || 'test-user-id';
        await this.plannersService.deletePlanner(id, userId);
        return {
            success: true,
            message: 'Planner deleted successfully',
        };
    }
    async addItemToPlanner(addItemDto, req) {
        var _a;
        const userId = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) || 'test-user-id';
        const item = await this.plannersService.addItemToPlanner(addItemDto, userId);
        return {
            success: true,
            message: 'Item added to planner successfully',
            data: item,
        };
    }
    async removeItemFromPlanner(itemId, req) {
        var _a;
        const userId = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) || 'test-user-id';
        await this.plannersService.removeItemFromPlanner(itemId, userId);
        return {
            success: true,
            message: 'Item removed from planner successfully',
        };
    }
    async getPlannerStats(id, req) {
        var _a;
        const userId = ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) || 'test-user-id';
        const stats = await this.plannersService.getPlannerStats(id, userId);
        return {
            success: true,
            message: 'Planner statistics retrieved successfully',
            data: stats,
        };
    }
};
exports.PlannersController = PlannersController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_planner_dto_1.CreatePlannerDto, Object]),
    __metadata("design:returntype", Promise)
], PlannersController.prototype, "createPlanner", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PlannersController.prototype, "getUserPlanners", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PlannersController.prototype, "getPlannerById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_planner_dto_1.UpdatePlannerDto, Object]),
    __metadata("design:returntype", Promise)
], PlannersController.prototype, "updatePlanner", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PlannersController.prototype, "deletePlanner", null);
__decorate([
    (0, common_1.Post)('items'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_item_to_planner_dto_1.AddItemToPlannerDto, Object]),
    __metadata("design:returntype", Promise)
], PlannersController.prototype, "addItemToPlanner", null);
__decorate([
    (0, common_1.Delete)('items/:itemId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('itemId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PlannersController.prototype, "removeItemFromPlanner", null);
__decorate([
    (0, common_1.Get)(':id/stats'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PlannersController.prototype, "getPlannerStats", null);
exports.PlannersController = PlannersController = __decorate([
    (0, common_1.Controller)('planners'),
    __metadata("design:paramtypes", [planners_service_1.PlannersService])
], PlannersController);
//# sourceMappingURL=planners.controller.js.map