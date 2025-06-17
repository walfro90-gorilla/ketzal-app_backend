"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateGlobalLocationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_global_location_dto_1 = require("./create-global-location.dto");
class UpdateGlobalLocationDto extends (0, swagger_1.PartialType)(create_global_location_dto_1.CreateGlobalLocationDto) {
}
exports.UpdateGlobalLocationDto = UpdateGlobalLocationDto;
//# sourceMappingURL=update-global-location.dto.js.map