"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const mongoose_1 = require("mongoose");
const isEmail = (email) => {
    const regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regEx.test(email);
};
exports.user = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        validate: [isEmail, 'Invalid email'],
        unique: true,
    },
    password: { type: String, minlength: 5 },
    role: String,
    players: [{ types: mongoose_1.SchemaTypes.ObjectId, ref: 'Character' }],
    games: [{ types: mongoose_1.SchemaTypes.ObjectId, ref: 'Game' }],
});
//# sourceMappingURL=user.entity.js.map