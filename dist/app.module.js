"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const products_module_1 = require("./products/products.module");
const prisma_service_1 = require("./prisma/prisma.service");
const services_module_1 = require("./services/services.module");
const suppliers_module_1 = require("./suppliers/suppliers.module");
const users_module_1 = require("./users/users.module");
const reviews_module_1 = require("./reviews/reviews.module");
const categories_module_1 = require("./categories/categories.module");
const global_locations_module_1 = require("./locations/global-locations.module");
const wallet_module_1 = require("./wallet/wallet.module");
const test_module_1 = require("./test/test.module");
const notifications_module_1 = require("./notifications/notifications.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [products_module_1.ProductsModule, services_module_1.ServicesModule, suppliers_module_1.SuppliersModule, users_module_1.UsersModule, reviews_module_1.ReviewsModule, categories_module_1.CategoriesModule, global_locations_module_1.GlobalLocationsModule, wallet_module_1.WalletModule, test_module_1.TestModule, notifications_module_1.NotificationsModule],
        controllers: [],
        providers: [prisma_service_1.PrismaService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map