import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { BcryptService } from '../auth/bcrypt.service';
import { AuthService } from '../auth/auth.service';
import { userSchema } from './entities/user.entity';
import { UserService } from './user.service';
import { characterSchema } from '../character/entities/character.entity';
import { gameSchema } from '../game/entities/game.entity';

describe('UserService', () => {
    const mockUser = {
        id: '',
        name: 'test',
        email: 'test@gmail.com',
        password: '12345',
        role: 'master',
        characters: [''],
        games: [''],
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
        delete: jest.fn(),
        populate: jest
            .fn()
            .mockReturnValue({ populate: jest.fn().mockResolvedValue({}) }),
    };

    const mockGame = {
        title: 'test',
        creator: 'testCreator',
        description: 'description',
        image: '',
        characters: [],
        save: jest.fn(),
    };

    const mockUserModel = {
        create: jest.fn().mockResolvedValue(mockUser),
        find: jest.fn().mockResolvedValue(mockUser),
        findOne: jest.fn().mockResolvedValue(mockUser),
        findById: jest.fn().mockResolvedValue(mockUser),
        findByIdAndUpdate: jest
            .fn()
            .mockResolvedValue({ ...mockUser, password: '54321' }),
        findByIdAndDelete: jest.fn().mockResolvedValue(mockUser),
    };

    const mockCharacterModel = {
        findById: jest.fn().mockResolvedValue(mockCharacter),
    };

    const mockGameModel = {
        findById: jest.fn().mockResolvedValue(mockGame),
    };

    const mockBcrypt = {
        encrypt: jest.fn().mockReturnValue('hashpwrd'),
        compare: jest.fn().mockReturnValue(true),
    };

    const mockAuth = {
        validateToken: jest.fn().mockReturnValue({ id: 'id' }),
        createToken: jest.fn().mockReturnValue('1f1f1f1f'),
    };

    const mockResponse = {
        user: mockUser,
        token: '1f1f1f1f',
    };

    let service: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                MongooseModule.forFeature([
                    { name: 'User', schema: userSchema },
                    { name: 'Character', schema: characterSchema },
                    { name: 'Game', schema: gameSchema },
                ]),
            ],
            providers: [
                UserService,
                { provide: AuthService, useValue: mockAuth },
                { provide: BcryptService, useValue: mockBcrypt },
            ],
        })
            .overrideProvider(getModelToken('User'))
            .useValue(mockUserModel)
            .overrideProvider(getModelToken('Character'))
            .useValue(mockCharacterModel)
            .overrideProvider(getModelToken('Game'))
            .useValue(mockGameModel)
            .compile();

        service = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('When calling service.create', () => {
        test('Then it should return the saved character', async () => {
            const result = await service.create(mockUser);
            expect(result).toEqual(mockResponse);
        });
    });

    describe('When calling service.create without required inputs', () => {
        test('Then it should throw an unauthorizedException', async () => {
            mockUserModel.create.mockResolvedValueOnce(null);
            expect(async () => {
                await service.create(mockUser);
            }).rejects.toThrow();
        });
    });

    describe('When calling service.login with a valid login info', () => {
        test('Then it should return the user data and its token', async () => {
            const result = await service.login({
                email: mockUser.email,
                password: mockUser.password,
            });
            expect(result).toEqual(mockResponse);
        });
    });

    describe('When calling service.login with an invalid email', () => {
        test('Then it should throw an unauthorized exception', () => {
            mockUserModel.findOne.mockResolvedValueOnce(null);
            expect(async () => {
                await service.login({
                    email: mockUser.email,
                    password: mockUser.password,
                });
            }).rejects.toThrow();
        });
    });

    describe('When calling service.login with an invalid password', () => {
        test('Then it should throw an unauthorized exception', () => {
            mockBcrypt.compare.mockReturnValueOnce(false);
            expect(async () => {
                await service.login({
                    email: mockUser.email,
                    password: mockUser.password,
                });
            }).rejects.toThrow();
        });
    });

    describe('When calling service.loginWithToken with a valid token', () => {
        test('Then it should return the user data and its token', async () => {
            const result = await service.loginWithToken('token');
            expect(result).toEqual(mockResponse);
        });
    });

    describe('When calling service.loginWithToken with an invalid or expired token', () => {
        test('Then it should throw an unauthorized exception', async () => {
            mockAuth.validateToken.mockReturnValue('error');
            expect(async () => {
                await service.loginWithToken('token');
            }).rejects.toThrow();
        });
    });

    describe('When calling service.loginWithToken with a valid token but user does not exist', () => {
        test('Then it should throw an unauthorized exception', async () => {
            mockAuth.validateToken.mockReturnValue({});
            mockUserModel.findById.mockResolvedValueOnce(null);
            expect(async () => {
                await service.loginWithToken('token');
            }).rejects.toThrow();
        });
    });

    describe('When calling service.find', () => {
        test('Then it should return all users', async () => {
            mockUserModel.find.mockReturnValueOnce({
                populate: jest.fn().mockResolvedValue(mockUser),
            });
            const result = await service.findAll();
            expect(result).toEqual(mockUser);
        });
    });
    describe('When calling service.findOne', () => {
        test('Then it should return the user selected', async () => {
            (mockUserModel.findById as jest.Mock).mockReturnValueOnce({
                populate: jest.fn().mockResolvedValue(mockUser),
            });
            const result = await service.findOne('');
            expect(result).toEqual(mockUser);
        });
    });
    describe('When calling service.update', () => {
        test('Then it should return the user updated', async () => {
            const result = await service.update('', { password: '54321' });
            expect(result).toEqual({ ...mockUser, password: '54321' });
        });
    });
    describe('When calling service.remove', () => {
        test('Then it should return the user deleted', async () => {
            const result = await service.remove('');
            expect(result).toEqual(mockUser);
        });
    });
});
