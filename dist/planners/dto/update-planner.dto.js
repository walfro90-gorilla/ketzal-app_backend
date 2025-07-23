"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePlannerDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_planner_dto_1 = require("./create-planner.dto");
class UpdatePlannerDto extends (0, mapped_types_1.PartialType)(create_planner_dto_1.CreatePlannerDto) {
}
exports.UpdatePlannerDto = UpdatePlannerDto;
//# sourceMappingURL=update-planner.dto.js.map