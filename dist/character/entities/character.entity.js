"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.characterSchema = void 0;
const mongoose_1 = require("mongoose");
exports.characterSchema = new mongoose_1.Schema({
    idGame: { types: mongoose_1.SchemaTypes.ObjectId, ref: 'Game' },
    name: String,
    properties: {
        experience: String,
        sanity: String,
        strength: String,
        intelligence: String,
        willingness: String,
        ability: String,
        violence: String,
    },
});
//# sourceMappingURL=character.entity.js.map