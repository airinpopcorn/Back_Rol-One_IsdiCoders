import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
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
        findById: jest.fn().mockResolvedValue(mockUser),
        findByIdAndUpdate: jest
            .fn()
            .mockResolvedValue({ ...mockUser, password: '54321' }),
        findByIdAndDelete: jest.fn().mockResolvedValue(mockUser),
    };
    let service: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                MongooseModule.forFeature([
                    { name: 'User', schema: userSchema },
                ]),
            ],
            providers: [UserService],
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
            expect(result).toEqual(mockUser);
        });
    });
    describe('When calling service.find', () => {
        test('Then it should return all users', async () => {
            const result = await service.findAll();
            expect(result).toEqual(mockUser);
        });
    });
    describe('When calling service.findById', () => {
        test('Then it should return the user selected', async () => {
            const result = await service.findOne('');
            expect(result).toEqual(mockUser);
        });
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
