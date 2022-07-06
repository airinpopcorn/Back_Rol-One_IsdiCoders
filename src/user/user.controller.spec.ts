import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth/auth.service';
import { BcryptService } from '../auth/bcrypt.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
    let controller: UserController;
    let service: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                {
                    provide: UserService,
                    useValue: {
                        create: jest.fn(),
                        login: jest.fn(),
                        loginWithToken: jest.fn(),
                        findAll: jest.fn(),
                        findOne: jest.fn(),
                        update: jest.fn(),
                        remove: jest.fn(),
                    },
                },
                AuthService,
                BcryptService,
            ],
        }).compile();

        controller = module.get<UserController>(UserController);
        service = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
    describe('When calling controller.create', () => {
        test('Then service.create should be called', async () => {
            await controller.create({
                name: 'test',
                email: 'test@gmail.com',
                password: '12345',
                role: 'master',
                characters: [],
                games: [],
            });
            expect(service.create).toHaveBeenCalled();
        });
    });

    describe('When calling controller.login without token', () => {
        test('Then service.login should be called', () => {
            controller.login(
                {
                    email: '',
                    password: '',
                },
                undefined
            );
            expect(service.login).toHaveBeenCalled();
        });
    });

    describe('When calling controller.login with token', () => {
        test('Then service.loginWithToken should be called', () => {
            controller.login(
                {
                    email: '',
                    password: '',
                },
                'token'
            );
            expect(service.loginWithToken).toHaveBeenCalled();
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
            await controller.update('', { password: '54321' });
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
