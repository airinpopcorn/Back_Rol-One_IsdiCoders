/* istanbul ignore file */
import { Schema, SchemaTypes, Types } from 'mongoose';

export const gameSchema = new Schema({
    title: String,
    creator: String,
    description: String,
    image: String,
    characters: [{ type: SchemaTypes.ObjectId, ref: 'Character' }],
    template: {},
});

export interface iGame {
    id?: Types.ObjectId;
    title: string;
    creator: string;
    description: string;
    image: string;
    characters: Array<string>;
}

gameSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.__v;
    },
});
