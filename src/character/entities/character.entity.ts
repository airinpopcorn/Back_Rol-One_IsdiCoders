import { Schema, SchemaTypes, Types } from 'mongoose';

export const characterSchema = new Schema({
    idGame: { type: SchemaTypes.ObjectId, ref: 'Game', required: true },
    player: { type: SchemaTypes.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    life: { type: String, required: true },
    strength: { type: String, required: true },
    constitution: { type: String, required: true },
    intelligence: { type: String, required: true },
    sanity: String,
    willingness: String,
    skill: String,
    violence: String,
    profession: String,
    reputation: String,
    tools: [String],
    clan: String,
    perception: String,
    dexterity: String,
    awareness: String,
    weapon: String,
    shield: String,
    effort: String,
    injury: String,
    abilities: [
        {
            name: String,
            value: String,
        },
    ],
    charisma: String,
    manipulation: String,
    appearence: String,
});

export interface iCharacter {
    id?: Types.ObjectId;
    player: Types.ObjectId;
    idGame: Types.ObjectId;
    name: string;
    life: string;
    strength: string;
    intelligence: string;
    constitution: string;
    sanity?: string;
    willingness?: string;
    skill?: string;
    violence?: string;
    profession?: string;
    reputation?: string;
    tools?: Array<string>;
    clan?: string;
    perception?: string;
    dexterity?: string;
    awareness?: string;
    weapon?: string;
    shield?: string;
    effort?: string;
    injury?: string;
    abilities?: [
        {
            name: string;
            value: string;
        }
    ];
    charisma?: string;
    manipulation?: string;
    appearence?: string;
}
