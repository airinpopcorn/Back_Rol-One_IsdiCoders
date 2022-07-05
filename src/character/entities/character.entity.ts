import { Schema, SchemaTypes, Types } from 'mongoose';

export const characterSchema = new Schema({
    idGame: { type: SchemaTypes.ObjectId, ref: 'Game' },
    name: String,
    experience: String,
    sanity: String,
    strength: String,
    intelligence: String,
    willingness: String,
    ability: String,
    violence: String,
});

export interface iCharacter {
    id?: Types.ObjectId;
    name: string;

    experience: string;
    sanity: string;
    strength: string;
    intelligence: string;
    willingness: string;
    ability: string;
    violence: string;
}
