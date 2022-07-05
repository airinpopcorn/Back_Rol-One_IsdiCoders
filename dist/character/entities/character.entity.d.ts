/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/inferschematype" />
import { Schema, Types } from 'mongoose';
export declare const characterSchema: Schema<any, import("mongoose").Model<any, any, any, any, any>, {}, {}, any, {}, "type", {
    name?: string;
    experience?: string;
    sanity?: string;
    strength?: string;
    intelligence?: string;
    willingness?: string;
    ability?: string;
    violence?: string;
    idGame?: Types.ObjectId;
}>;
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
