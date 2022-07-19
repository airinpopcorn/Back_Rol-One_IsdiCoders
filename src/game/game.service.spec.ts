import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { userSchema } from '../user/entities/user.entity';
import { characterSchema } from '../character/entities/character.entity';
import { gameSchema } from './entities/game.entity';
import { GameService } from './game.service';

describe('GameService', () => {
    const mockGame = {
        title: 'test',
        creator: 'testCreator',
        description: "It's a test",
        image: 'test.jpg',
        characters: [''],
        save: jest.fn(),
        populate: jest.fn().mockResolvedValue({}),
    };

    const mockCharacter = {
        idGame: '',
        player: '',
        name: 'test',
        life: '15',
        strength: '4',
        constitution: '6',
        intelligence: '2',
        save: jest.fn(),
        populate: jest
            .fn()
            .mockReturnValue({ populate: jest.fn().mockResolvedValue({}) }),
    };

    const mockUser = {
        name: 'testUser',
        email: 'test@gmail.com',
        password: '12345',
        role: 'master',
        characters: [],
        save: jest.fn(),
    };

    const mockGameModel = {
        create: jest.fn().mockResolvedValue(mockGame),
        find: jest.fn().mockReturnValue(mockGame),
        findById: jest.fn().mockResolvedValue(mockGame),
    };

    const mockCharacterModel = {
        findById: jest.fn().mockResolvedValue(mockCharacter),
    };

    const mockUserModel = {
        findById: jest.fn().mockResolvedValue(mockUser),
    };

    let service: GameService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                MongooseModule.forFeature([
                    { name: 'Game', schema: gameSchema },
                    { name: 'Character', schema: characterSchema },
                    { name: 'User', schema: userSchema },
                ]),
            ],
            providers: [GameService],
        })
            .overrideProvider(getModelToken('Game'))
            .useValue(mockGameModel)
            .overrideProvider(getModelToken('Character'))
            .useValue(mockCharacterModel)
            .overrideProvider(getModelToken('User'))
            .useValue(mockUserModel)
            .compile();

        service = module.get<GameService>(GameService);
    });

    test('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('When calling service.create', () => {
        test('Then it should return the saved game', async () => {
            const result = await service.create(mockGame);
            expect(result).toEqual(mockGame);
        });
    });
    describe('When calling service.find', () => {
        test('Then it should return all games', async () => {
            mockGameModel.find.mockReturnValueOnce({
                populate: jest.fn().mockResolvedValue([mockGame]),
            });
            const result = await service.findAll();
            expect(result).toEqual([mockGame]);
        });
    });
    describe('When calling service.findById', () => {
        test('Then it should return the game selected', async () => {
            mockGameModel.findById.mockReturnValueOnce({
                populate: jest.fn().mockResolvedValue(mockGame),
            });
            const result = await service.findOne('');
            expect(result).toEqual(mockGame);
        });
    });
    describe('When calling service.addNewCharacterToGame', () => {
        test('Then it should return the game selected with a new character added in its array of characters', async () => {
            const result = await service.addNewCharacterToGame('', '');
            expect(result).toEqual(mockGame);
        });
    });
});
