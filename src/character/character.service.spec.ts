import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CharacterService } from './character.service';
import { characterSchema } from './entities/character.entity';

describe('CharacterService', () => {
    const mockCharacter = {
        idGame: '',
        player: '',
        name: 'test',
        life: '15',
        strength: '4',
        constitution: '6',
        intelligence: '2',
        populate: jest
            .fn()
            .mockReturnValue({ populate: jest.fn().mockResolvedValue({}) }),
    };
    const mockCharacterModel = {
        create: jest.fn().mockResolvedValue(mockCharacter),
        find: jest.fn().mockResolvedValue(mockCharacter),
        findById: jest.fn().mockResolvedValue(mockCharacter),
        findByIdAndUpdate: jest
            .fn()
            .mockResolvedValue({ ...mockCharacter, name: 'update' }),
        findByIdAndDelete: jest.fn().mockResolvedValue(mockCharacter),
    };

    let service: CharacterService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                MongooseModule.forFeature([
                    { name: 'Character', schema: characterSchema },
                ]),
            ],
            providers: [CharacterService],
        })
            .overrideProvider(getModelToken('Character'))
            .useValue(mockCharacterModel)
            .compile();

        service = module.get<CharacterService>(CharacterService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('When calling service.create', () => {
        test('Then it should return the saved character', async () => {
            const result = await service.create(mockCharacter);
            expect(result).toEqual(mockCharacter);
        });
    });
    describe('When calling service.find', () => {
        test('Then it should return all characters', async () => {
            mockCharacterModel.find.mockReturnValueOnce({
                populate: jest.fn().mockReturnValue({
                    populate: jest.fn().mockResolvedValue(mockCharacter),
                }),
            });
            const result = await service.findAll();
            expect(result).toEqual(mockCharacter);
        });
    });
    describe('When calling service.findOne', () => {
        test('Then it should return the character selected', async () => {
            mockCharacterModel.findById.mockReturnValueOnce({
                populate: jest.fn().mockReturnValue({
                    populate: jest.fn().mockResolvedValue(mockCharacter),
                }),
            });
            const result = await service.findOne('');
            expect(result).toEqual(mockCharacter);
        });
    });
    describe('When calling service.update', () => {
        test('Then it should return the character updated', async () => {
            const result = await service.update('', { name: 'update' });
            expect(result).toEqual({ ...mockCharacter, name: 'update' });
        });
    });
    describe('When calling service.remove', () => {
        test('Then it should return the character deleted', async () => {
            const result = await service.remove('');
            expect(result).toEqual(mockCharacter);
        });
    });
});
