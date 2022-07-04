"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCharacterDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_character_dto_1 = require("./create-character.dto");
class UpdateCharacterDto extends (0, mapped_types_1.PartialType)(create_character_dto_1.CreateCharacterDto) {
}
exports.UpdateCharacterDto = UpdateCharacterDto;
//# sourceMappingURL=update-character.dto.js.map