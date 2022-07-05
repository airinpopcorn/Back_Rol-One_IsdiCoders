import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { iCharacter } from './entities/character.entity';

@Injectable()
export class CharacterService {
    constructor(
        @InjectModel('Character') private readonly Character: Model<iCharacter>
    ) {}
    async create(createCharacterDto: CreateCharacterDto) {
        const newCharacter = await this.Character.create(createCharacterDto);
        return newCharacter;
    }

    async findAll() {
        return await this.Character.find();
    }

    async findOne(id: string) {
        return await this.Character.findById(id);
    }

    async update(id: string, updateCharacterDto: UpdateCharacterDto) {
        return this.Character.findByIdAndUpdate(id, updateCharacterDto, {
            new: true,
        });
    }

    remove(id: string) {
        return this.Character.findByIdAndDelete(id);
    }
}
