import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { iGame } from './entities/game.entity';

@Injectable()
export class GameService {
    constructor(@InjectModel('Game') private readonly Game: Model<iGame>) {}
    create(createGameDto: CreateGameDto) {
        return this.Game.create(createGameDto);
    }

    findAll() {
        return this.Game.find();
    }

    findOne(id: string) {
        return this.Game.findById(id);
    }

    update(id: string, updateGameDto: UpdateGameDto) {
        return this.Game.findByIdAndUpdate(id, updateGameDto, { new: true });
    }

    remove(id: string) {
        return this.Game.findByIdAndDelete(id);
    }
}
