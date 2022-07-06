import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { BcryptService } from '../auth/bcrypt.service';
import { AuthService } from '../auth/auth.service';
import { userSchema } from './entities/user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
    const mockUser = {
        name: 'test',
        email: 'test@gmail.com',
        password: '12345',
        role: 'master',
        characters: [''],
        games: [''],
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
            mockUserModel.findById.mockResolvedValueOnce(null);
            expect(async () => {
                await service.loginWithToken('token');
            }).rejects.toThrow();
        });
    });

    describe('When calling service.find', () => {
        test('Then it should return all users', async () => {
            const result = await service.findAll();
            expect(result).toEqual(mockUser);
        });
    });
    describe('When calling service.findById', () => {
        test.todo(
            'Then it should return the user selected'
            // , async () => {
            //     (mockUserModel.findById as jest.Mock).mockResolvedValue(mockUser);
            //     const result = await service.findOne('');
            //     expect(result).toEqual(mockUser);
            // }
        );
    });
    describe('When calling service.findByIdAndUpdate', () => {
        test('Then it should return the user updated', async () => {
            const mockUpdateCharacter = {
                name: 'test',
                email: 'test@gmail.com',
                password: '54321',
                role: 'master',
                characters: [''],
                games: [''],
            };
            const result = await service.update('', { password: '54321' });
            expect(result).toEqual(mockUpdateCharacter);
        });
    });
    describe('When calling service.findByIdAndDelete', () => {
        test('Then it should return the user deleted', async () => {
            const result = await service.remove('');
            expect(result).toEqual(mockUser);
        });
    });
});
