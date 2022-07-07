import { NextFunction, Request, Response } from 'express';
import { Model } from 'mongoose';
import { iCharacter } from '../character/entities/character.entity';
import { AuthService } from '../auth/auth.service';
import { UserRequiredMiddleware } from './user.required.middleware';
describe('Given UserRequiredMiddleware class', () => {
    let req: Partial<Request>;
    let resp: Response;
    let next: NextFunction;
    const mockCharacterModel = {
        findById: jest.fn(),
    };
    const mockAuthService = {
        validateToken: jest.fn(),
        createToken: jest.fn(),
    } as AuthService;
    beforeEach(() => {
        req = {
            params: { id: 'userId' },
            get: jest.fn().mockReturnValue('bearer token'),
        };
        resp = {} as Response;
        next = jest.fn();
    });

    const userMiddleware = new UserRequiredMiddleware(
        mockCharacterModel as unknown as Model<iCharacter>,
        mockAuthService
    );

    describe('When calling use method with a correct token', () => {
        test('Then it should call next function with no errors', async () => {
            (mockAuthService.validateToken as jest.Mock).mockReturnValueOnce({
                id: 'test',
            });
            (mockCharacterModel.findById as jest.Mock).mockResolvedValueOnce({
                player: 'test',
            });
            await userMiddleware.use(req as Request, resp, next);
            expect(next).toHaveBeenCalled();
        });
    });
    describe('When calling use method with an invalid token', () => {
        test('Then it should throw an unauthorizedException', () => {
            (mockAuthService.validateToken as jest.Mock).mockReturnValueOnce({
                id: '',
            });
            (mockCharacterModel.findById as jest.Mock).mockResolvedValueOnce({
                player: 'test',
            });

            expect(() =>
                userMiddleware.use(req as Request, resp, next)
            ).rejects.toThrow();
        });
    });
    describe('When calling use method with an expired token', () => {
        const mockAuthServiceBad = {
            validateToken: jest.fn().mockImplementation(() => {
                throw new Error();
            }),
            createToken: jest.fn(),
        } as AuthService;
        test('Then it should throw an unauthorizedException error', () => {
            const userMiddleware = new UserRequiredMiddleware(
                mockCharacterModel as unknown as Model<iCharacter>,
                mockAuthServiceBad
            );
            expect(() =>
                userMiddleware.use(req as Request, resp, next)
            ).rejects.toThrow();
        });
    });
    describe('When calling use method with an invalid token', () => {
        req = {
            params: { id: 'userId' },
            get: jest.fn().mockReturnValueOnce(''),
        };
        const mockAuthServiceBad = {
            validateToken: jest.fn().mockReturnValue('null'),
            createToken: jest.fn(),
        } as AuthService;
        test('Then it should throw an unauthorizedException', () => {
            const userMiddleware = new UserRequiredMiddleware(
                mockCharacterModel as unknown as Model<iCharacter>,
                mockAuthServiceBad
            );
            expect(() => userMiddleware.use(req, resp, next)).rejects.toThrow();
        });
    });
});

describe('When calling use method with a non existing token', () => {
    let resp: Response;
    let next: NextFunction;
    const mockCharacterModel = {
        findById: jest.fn(),
    };
    const req = {
        params: { id: 'userId' },
        get: jest.fn().mockReturnValue(null),
    };
    const mockAuthServiceBad = {
        validateToken: jest.fn().mockReturnValue('null'),
        createToken: jest.fn(),
    } as AuthService;
    test('Then it should throw an unauthorizedException', () => {
        const userMiddleware = new UserRequiredMiddleware(
            mockCharacterModel as unknown as Model<iCharacter>,
            mockAuthServiceBad
        );
        expect(() => userMiddleware.use(req, resp, next)).rejects.toThrow();
    });
});
