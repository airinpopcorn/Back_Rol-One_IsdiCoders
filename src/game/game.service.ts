import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { iCharacter } from '../character/entities/character.entity';
import { CreateGameDto } from './dto/create-game.dto';
import { iGame } from './entities/game.entity';

@Injectable()
export class GameService {
    constructor(
        @InjectModel('Game') private readonly Game: Model<iGame>,
        @InjectModel('Character') private readonly Character: Model<iCharacter>
    ) {}
    async create(createGameDto: CreateGameDto) {
        return await this.Game.create(createGameDto);
    }

    async findAll() {
        return await this.Game.find().populate('characters');
    }

    async findOne(id: string) {
        return await this.Game.findById(id).populate('characters');
    }

    async addNewCharacterToGame(id: string, idCharacter: string) {
        const foundGame = await this.Game.findById(id);
        foundGame.characters.push(idCharacter);
        foundGame.save();
        const foundCharacter = await this.Character.findById(idCharacter);
        foundCharacter.idGame = foundGame.id;
        foundCharacter.save();
        return foundGame;
    }
}
