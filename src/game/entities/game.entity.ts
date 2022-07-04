import { Schema, SchemaTypes, Types } from 'mongoose';

export const gameSchema = new Schema({
    title: String,
    creator: String,
    description: String,
    image: String,
    characters: [{ types: SchemaTypes.ObjectId, ref: 'Character' }],
});

export interface iGame {
    id?: Types.ObjectId;
    title: string;
    creator: string;
    description: string;
    image: string;
    characters: Array<Types.ObjectId>;
}
