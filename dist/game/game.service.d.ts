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
import { Model } from 'mongoose';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { iGame } from './entities/game.entity';
export declare class GameService {
    private readonly Game;
    constructor(Game: Model<iGame>);
    create(createGameDto: CreateGameDto): Promise<import("mongoose").Document<unknown, any, iGame> & iGame & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findAll(): import("mongoose").Query<(import("mongoose").Document<unknown, any, iGame> & iGame & {
        _id: import("mongoose").Types.ObjectId;
    })[], import("mongoose").Document<unknown, any, iGame> & iGame & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, iGame>;
    findOne(id: string): import("mongoose").Query<import("mongoose").Document<unknown, any, iGame> & iGame & {
        _id: import("mongoose").Types.ObjectId;
    }, import("mongoose").Document<unknown, any, iGame> & iGame & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, iGame>;
    update(id: string, updateGameDto: UpdateGameDto): import("mongoose").Query<import("mongoose").Document<unknown, any, iGame> & iGame & {
        _id: import("mongoose").Types.ObjectId;
    }, import("mongoose").Document<unknown, any, iGame> & iGame & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, iGame>;
    remove(id: string): import("mongoose").Query<import("mongoose").Document<unknown, any, iGame> & iGame & {
        _id: import("mongoose").Types.ObjectId;
    }, import("mongoose").Document<unknown, any, iGame> & iGame & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, iGame>;
}
