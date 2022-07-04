import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
export declare class CharacterController {
    private readonly characterService;
    constructor(characterService: CharacterService);
    create(createCharacterDto: CreateCharacterDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateCharacterDto: UpdateCharacterDto): string;
    remove(id: string): string;
}
