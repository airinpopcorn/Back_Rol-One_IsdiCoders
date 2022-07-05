import { Schema, SchemaTypes, Types } from 'mongoose';

const isEmail = (email: string) => {
    const regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regEx.test(email);
};

export const user = new Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        validate: [isEmail, 'Invalid email'],
        unique: true,
    },
    password: { type: String, minlength: 5 },
    role: String,
    players: [{ type: SchemaTypes.ObjectId, ref: 'Character' }],
    games: [{ type: SchemaTypes.ObjectId, ref: 'Game' }],
});

export interface iUser {
    id?: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    role: string;
    players: Array<Types.ObjectId>;
    games: Array<Types.ObjectId>;
}
