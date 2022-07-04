import { Schema, SchemaTypes, Types } from 'mongoose';

export const characterSchema = new Schema({
    idGame: { types: SchemaTypes.ObjectId, ref: 'Game' },
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

export interface iCharacter {
    id?: Types.ObjectId;
    name: string;
    properties: {
        experience: string;
        sanity: string;
        strength: string;
        intelligence: string;
        willingness: string;
        ability: string;
        violence: string;
    };
}
