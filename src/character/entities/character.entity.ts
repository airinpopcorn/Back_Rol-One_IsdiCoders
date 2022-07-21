/* istanbul ignore file */
import { Schema, SchemaTypes, Types } from 'mongoose';
import { iUser } from 'src/user/entities/user.entity';

export const characterSchema = new Schema({
    idGame: { type: SchemaTypes.ObjectId, ref: 'Game' },
    player: { type: SchemaTypes.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    life: { type: String, required: true },
    strength: { type: String, required: true },
    constitution: { type: String, required: true },
    intelligence: { type: String, required: true },
    image: {
        type: String,
        default:
            'https://firebasestorage.googleapis.com/v0/b/final-project-90733.appspot.com/o/edward-removebg-preview.png?alt=media&token=3beea9de-fbc4-4162-8478-5601a27275d8',
    },
    sanity: String,
    description: String,
    willingness: String,
    skill: String,
    violence: String,
    profession: String,
    reputation: String,
    clan: String,
    perception: String,
    dexterity: String,
    awareness: String,
    weapon: String,
    shield: String,
    effort: String,
    injury: String,
    charisma: String,
    manipulation: String,
    appearence: String,
});

export interface iCharacter {
    id?: Types.ObjectId;
    player?: iUser;
    idGame?: string;
    image?: string;
    name: string;
    life: string;
    strength: string;
    intelligence: string;
    constitution: string;
    description?: string;
    sanity?: string;
    willingness?: string;
    skill?: string;
    violence?: string;
    profession?: string;
    reputation?: string;
    clan?: string;
    perception?: string;
    dexterity?: string;
    awareness?: string;
    weapon?: string;
    shield?: string;
    effort?: string;
    injury?: string;
    charisma?: string;
    manipulation?: string;
    appearence?: string;
}

characterSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.__v;
    },
});
