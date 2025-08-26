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
exports.ServicesController = void 0;
const common_1 = require("@nestjs/common");
const services_service_1 = require("./services.service");
const create_service_dto_1 = require("./dto/create-service.dto");
function isPrismaError(error) {
    return typeof error === "object" && error !== null && "code" in error;
}
let ServicesController = class ServicesController {
    constructor(servicesService) {
        this.servicesService = servicesService;
    }
    async create(createServiceDto) {
        console.log("Backend received request with DTO:", JSON.stringify(createServiceDto, null, 2));
        try {
            const service = await this.servicesService.create(createServiceDto);
            return {
                message: "Servicio creado exitosamente",
                data: service,
            };
        }
        catch (error) {
            if (isPrismaError(error)) {
                if (error.code === "P2003") {
                    throw new common_1.BadRequestException("El proveedor (supplier, hotel, or transport) no existe.");
                }
                if (error.code === "P2002") {
                    throw new common_1.ConflictException("Ya existe un servicio con este nombre.");
                }
            }
            console.error("Error creating service in controller:", error);
            throw new common_1.InternalServerErrorException("No se pudo crear el servicio.");
        }
    }
    findAll(page, limit, search, hasTransport) {
        if (page || limit || search || hasTransport) {
            const pageNum = parseInt(page || "1");
            const limitNum = parseInt(limit || "10");
            if (isNaN(pageNum) || isNaN(limitNum) || pageNum < 1 || limitNum < 1) {
                throw new common_1.BadRequestException("Los parámetros page y limit deben ser números positivos");
            }
            return this.servicesService.findAllWithBusInfo({
                page: pageNum,
                limit: limitNum,
                search,
                hasTransport: hasTransport === "true"
                    ? true
                    : hasTransport === "false"
                        ? false
                        : undefined,
            });
        }
        return this.servicesService.findAll();
    }
    findAllWithReviewStats() {
        return this.servicesService.findAllWithReviewStats();
    }
    findOne(id) {
        return this.servicesService.findOne(+id);
    }
    update(id, updateServiceDto) {
        return this.servicesService.update(+id, updateServiceDto);
    }
    getServiceDependencies(id) {
        return this.servicesService.getServiceDependencies(+id);
    }
    async getBusTransportConfig(id) {
        const config = await this.servicesService.getBusTransportConfig(id);
        if (!config) {
            throw new common_1.NotFoundException("Servicio no encontrado");
        }
        return config;
    }
    async updateBusTransportConfig(id, updateBusTransportDto) {
        try {
            const updatedService = await this.servicesService.updateBusTransportConfig(id, updateBusTransportDto);
            return {
                message: "Configuración actualizada exitosamente",
                service: updatedService,
            };
        }
        catch (error) {
            if (isPrismaError(error) && error.code === "P2025") {
                throw new common_1.NotFoundException("Servicio no encontrado");
            }
            throw error;
        }
    }
    remove(id) {
        return this.servicesService.remove(+id);
    }
};
exports.ServicesController = ServicesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_service_dto_1.CreateServiceDto]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)("page")),
    __param(1, (0, common_1.Query)("limit")),
    __param(2, (0, common_1.Query)("search")),
    __param(3, (0, common_1.Query)("hasTransport")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", void 0)
], ServicesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("with-reviews"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ServicesController.prototype, "findAllWithReviewStats", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ServicesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ServicesController.prototype, "update", null);
__decorate([
    (0, common_1.Get)(":id/dependencies"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ServicesController.prototype, "getServiceDependencies", null);
__decorate([
    (0, common_1.Get)(":id/bus-transport"),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "getBusTransportConfig", null);
__decorate([
    (0, common_1.Put)(":id/bus-transport"),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "updateBusTransportConfig", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ServicesController.prototype, "remove", null);
exports.ServicesController = ServicesController = __decorate([
    (0, common_1.Controller)("services"),
    __metadata("design:paramtypes", [services_service_1.ServicesService])
], ServicesController);
//# sourceMappingURL=services.controller.js.map