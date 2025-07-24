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
exports.SupplierApprovalDto = exports.SupplierApprovalAction = void 0;
const class_validator_1 = require("class-validator");
var SupplierApprovalAction;
(function (SupplierApprovalAction) {
    SupplierApprovalAction["APPROVE"] = "approve";
    SupplierApprovalAction["DECLINE"] = "decline";
})(SupplierApprovalAction || (exports.SupplierApprovalAction = SupplierApprovalAction = {}));
class SupplierApprovalDto {
    constructor() {
        this.action = SupplierApprovalAction.APPROVE;
        this.userId = '';
    }
}
exports.SupplierApprovalDto = SupplierApprovalDto;
__decorate([
    (0, class_validator_1.IsEnum)(SupplierApprovalAction),
    __metadata("design:type", String)
], SupplierApprovalDto.prototype, "action", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SupplierApprovalDto.prototype, "userId", void 0);
//# sourceMappingURL=supplier-approval.dto.js.map