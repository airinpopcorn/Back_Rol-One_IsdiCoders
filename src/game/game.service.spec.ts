import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
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
    const mockGameModel = {
        create: jest.fn().mockResolvedValue(mockGame),
        find: jest.fn().mockReturnValue(mockGame),
        findById: jest.fn().mockResolvedValue(mockGame),
    };

    let service: GameService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                MongooseModule.forFeature([
                    { name: 'Game', schema: gameSchema },
                ]),
            ],
            providers: [GameService],
        })
            .overrideProvider(getModelToken('Game'))
            .useValue(mockGameModel)
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
            const result = await service.findAll();
            expect(result).toEqual({});
        });
    });
    describe('When calling service.findById', () => {
        test('Then it should return the game selected', async () => {
            const result = await service.findOne('');
            expect(result).toEqual(mockGame);
        });
    });
    describe('When calling service.assNewCharacterToGame', () => {
        test('Then it should return the game selected with a new character added in its array of characters', async () => {
            const result = await service.addNewCharacterToGame('', '');
            expect(result).toEqual(mockGame);
        });
    });
});
