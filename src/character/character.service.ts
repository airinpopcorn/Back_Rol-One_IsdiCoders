import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { iUser } from '../user/entities/user.entity';
import { iGame } from '../game/entities/game.entity';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { iCharacter } from './entities/character.entity';

@Injectable()
export class CharacterService {
    constructor(
        @InjectModel('Character') private readonly Character: Model<iCharacter>,
        @InjectModel('Game') private readonly Game: Model<iGame>,
        @InjectModel('User') private readonly User: Model<iUser>
    ) {}
    async create(createCharacterDto: CreateCharacterDto) {
        const newCharacter = await this.Character.create(createCharacterDto);

        const foundGame = await this.Game.findById(newCharacter.idGame);
        foundGame.characters.push(newCharacter.id);
        foundGame.save();

        const foundUser = await this.User.findById(newCharacter.player);
        foundUser.characters.push(newCharacter.id);
        foundUser.save();

        return newCharacter;
    }

    async findAll() {
        return await this.Character.find()
            .populate('player', {
                id: 1,
                name: 1,
            })
            .populate('idGame', { characters: 0 });
    }

    async findOne(id: string) {
        return await this.Character.findById(id)
            .populate('player', {
                id: 1,
                name: 1,
            })
            .populate('idGame', { characters: 0 });
    }

    async update(id: string, updateCharacterDto: UpdateCharacterDto) {
        return await this.Character.findByIdAndUpdate(id, updateCharacterDto, {
            new: true,
        });
    }

    async remove(id: string) {
        const character = await this.Character.findById(id);
        const game = await this.Game.findById(character.idGame);
        game.characters = game.characters.filter(
            (item) => String(item) !== String(character.id)
        );
        game.save();
        const user = await this.User.findById(character.player);
        user.characters = user.characters.filter(
            (item) => String(item) !== String(character.id)
        );
        user.save();

        character.delete();

        return character;
    }
}
