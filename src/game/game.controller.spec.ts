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
                    },
                },
            ],
        }).compile();

        controller = module.get<GameController>(GameController);
        service = module.get<GameService>(GameService);
    });
    //What to put on controller.create test
    // controller.create({
    //     title: 'test',
    //     creator: 'testCreator',
    //     description: 'testDescription',
    //     image: 'testImg',
    //     characters: [],
    // });
    // expect(service.create).toHaveBeenCalled();
    describe('When we call controller.create', () => {
        test.todo('Then service.create should be called');
    });
    describe('When we call controller.findAll', () => {
        test.todo('Then service.findAll should be called');
    });
    describe('When we call controller.findOne', () => {
        test.todo('Then service.findOne should be called');
    });
});
