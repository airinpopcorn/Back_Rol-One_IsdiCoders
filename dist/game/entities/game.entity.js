"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameSchema = void 0;
const mongoose_1 = require("mongoose");
exports.gameSchema = new mongoose_1.Schema({
    title: String,
    creator: String,
    description: String,
    image: String,
    characters: [{ type: mongoose_1.SchemaTypes.ObjectId, ref: 'Character' }],
});
//# sourceMappingURL=game.entity.js.map