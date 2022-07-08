import { Test, TestingModule } from '@nestjs/testing';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';

describe('CharacterController', () => {
    let controller: CharacterController;
    let service: CharacterService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CharacterController],
            providers: [
                {
                    provide: CharacterService,
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

        controller = module.get<CharacterController>(CharacterController);
        service = module.get<CharacterService>(CharacterService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
    describe('When calling controller.create', () => {
        test('Then service.create should be called', async () => {
            await controller.create({
                name: 'test',
                life: '15',
                strength: '5',
                constitution: '6',
                intelligence: '2',
                idGame: '',
                player: '',
            });
            expect(service.create).toHaveBeenCalled();
        });
    });
    describe('When calling controller.findAll', () => {
        test('Then service.findAll should be called', async () => {
            await controller.findAll();
            expect(service.findAll).toHaveBeenCalled();
        });
    });
    describe('When calling controller.findOne', () => {
        test('Then service.findOne should be called', async () => {
            await controller.findOne('');
            expect(service.findOne).toHaveBeenCalled();
        });
    });
    describe('When calling controller.update', () => {
        test('Then service.update should be called', async () => {
            await controller.update('', { name: 'update' });
            expect(service.update).toHaveBeenCalled();
        });
    });
    describe('When calling controller.remove', () => {
        test('Then service.remove should be called', async () => {
            await controller.remove('');
            expect(service.remove).toHaveBeenCalled();
        });
    });
});
