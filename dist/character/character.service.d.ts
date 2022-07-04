import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
export declare class CharacterService {
    create(createCharacterDto: CreateCharacterDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateCharacterDto: UpdateCharacterDto): string;
    remove(id: number): string;
}
