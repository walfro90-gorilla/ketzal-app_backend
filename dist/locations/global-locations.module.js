"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalLocationsModule = void 0;
const common_1 = require("@nestjs/common");
const global_locations_service_1 = require("./global-locations.service");
const global_locations_controller_1 = require("./global-locations.controller");
const prisma_service_1 = require("../prisma/prisma.service");
let GlobalLocationsModule = class GlobalLocationsModule {
};
exports.GlobalLocationsModule = GlobalLocationsModule;
exports.GlobalLocationsModule = GlobalLocationsModule = __decorate([
    (0, common_1.Module)({
        controllers: [global_locations_controller_1.GlobalLocationsController],
        providers: [global_locations_service_1.GlobalLocationsService, prisma_service_1.PrismaService],
    })
], GlobalLocationsModule);
//# sourceMappingURL=global-locations.module.js.map