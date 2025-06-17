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
exports.GlobalLocationsController = void 0;
const common_1 = require("@nestjs/common");
const global_locations_service_1 = require("./global-locations.service");
const create_global_location_dto_1 = require("./dto/create-global-location.dto");
const update_global_location_dto_1 = require("./dto/update-global-location.dto");
const swagger_1 = require("@nestjs/swagger");
let GlobalLocationsController = class GlobalLocationsController {
    constructor(globalLocationsService) {
        this.globalLocationsService = globalLocationsService;
    }
    create(createDto) {
        return this.globalLocationsService.create(createDto);
    }
    findAll() {
        return this.globalLocationsService.findAll();
    }
    findOne(id) {
        return this.globalLocationsService.findOne(+id);
    }
    update(id, updateDto) {
        return this.globalLocationsService.update(+id, updateDto);
    }
    remove(id) {
        return this.globalLocationsService.remove(+id);
    }
};
exports.GlobalLocationsController = GlobalLocationsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a global location' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_global_location_dto_1.CreateGlobalLocationDto]),
    __metadata("design:returntype", void 0)
], GlobalLocationsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List all global locations' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GlobalLocationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GlobalLocationsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_global_location_dto_1.UpdateGlobalLocationDto]),
    __metadata("design:returntype", void 0)
], GlobalLocationsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GlobalLocationsController.prototype, "remove", null);
exports.GlobalLocationsController = GlobalLocationsController = __decorate([
    (0, swagger_1.ApiTags)('global_locations'),
    (0, common_1.Controller)('global_locations'),
    __metadata("design:paramtypes", [global_locations_service_1.GlobalLocationsService])
], GlobalLocationsController);
//# sourceMappingURL=global-locations.controller.js.map