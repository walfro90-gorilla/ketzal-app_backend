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
exports.CreatePlannerDto = exports.PlannerStatusDto = void 0;
const class_validator_1 = require("class-validator");
var PlannerStatusDto;
(function (PlannerStatusDto) {
    PlannerStatusDto["PLANNING"] = "PLANNING";
    PlannerStatusDto["RESERVED"] = "RESERVED";
    PlannerStatusDto["CONFIRMED"] = "CONFIRMED";
    PlannerStatusDto["TRAVELLING"] = "TRAVELLING";
    PlannerStatusDto["COMPLETED"] = "COMPLETED";
})(PlannerStatusDto || (exports.PlannerStatusDto = PlannerStatusDto = {}));
class CreatePlannerDto {
}
exports.CreatePlannerDto = CreatePlannerDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePlannerDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePlannerDto.prototype, "destination", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePlannerDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePlannerDto.prototype, "startDate", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePlannerDto.prototype, "endDate", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreatePlannerDto.prototype, "budget", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreatePlannerDto.prototype, "travelers", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(PlannerStatusDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePlannerDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreatePlannerDto.prototype, "isPublic", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePlannerDto.prototype, "shareCode", void 0);
//# sourceMappingURL=create-planner.dto.js.map