import { Test, TestingModule } from '@nestjs/testing';
import { GameController } from './game.controller';
import { GameService } from './game.service';

describe('GameController', () => {
    let controller: GameController;
    let service: GameService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [GameController],
            providers: [
                {
                    provide: GameService,
                    useValue: {
                        create: jest.fn(),
                        findAll: jest.fn(),
                        findOne: jest.fn(),
                        update: jest.fn(),
                        remove: jest.fn(),
                        addNewCharacterToGame: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<GameController>(GameController);
        service = module.get<GameService>(GameService);
    });

    describe('When we call controller.create', () => {
        test('Then service.create should be called', async () => {
            await controller.create({
                title: 'test',
                creator: 'testCreator',
                description: 'testDescription',
                image: 'testImg',
                characters: [],
            });
            expect(service.create).toHaveBeenCalled();
        });
    });
    describe('When we call controller.findAll', () => {
        test('Then service.findAll should be called', async () => {
            await controller.findAll();
            expect(service.findAll).toHaveBeenCalled();
        });
    });
    describe('When we call controller.findOne', () => {
        test('Then service.findOne should be called', async () => {
            await controller.findOne('');
            expect(service.findOne).toHaveBeenCalled();
        });
    });
    describe('When calling controller.update in /addCharacter/:id route', () => {
        test('Then service.addNewCharacterToGame should be called', async () => {
            await controller.update('', { idCharacter: '' });
            expect(service.addNewCharacterToGame).toHaveBeenCalled();
        });
    });
});
