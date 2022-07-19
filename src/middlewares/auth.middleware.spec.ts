import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../auth/auth.service';
import { AuthMiddleware } from './auth.middleware';

describe('Given AuthMiddleware class', () => {
    let authMiddleware: AuthMiddleware;
    let req: Partial<Request>;
    let resp: Response;
    let next: NextFunction;

    beforeEach(() => {
        req = {
            headers: { authorization: 'bearer token' },
            get: jest.fn().mockReturnValue('bearer token'),
        };
        resp = {} as Response;
        next = jest.fn();
    });

    describe('When calling use method with a correct token', () => {
        const mockAuthServiceGood = {
            validateToken: jest.fn().mockReturnValue('token'),
            createToken: jest.fn(),
        } as AuthService;
        test('Then it should call next function with no errors', () => {
            authMiddleware = new AuthMiddleware(mockAuthServiceGood);
            (
                mockAuthServiceGood.validateToken as jest.Mock
            ).mockReturnValueOnce({});

            authMiddleware.use(req as Request, resp, next);
            expect(next).toHaveBeenCalled();
        });
    });
    describe('When calling use method with incorrect token', () => {
        const mockAuthServiceBad = {
            validateToken: jest.fn().mockReturnValue(''),
            createToken: jest.fn(),
        } as AuthService;
        test('Then it should call next function with no errors', () => {
            authMiddleware = new AuthMiddleware(mockAuthServiceBad);
            expect(() =>
                authMiddleware.use(req as Request, resp, next)
            ).toThrow();
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
            authMiddleware = new AuthMiddleware(mockAuthServiceBad);
            expect(() =>
                authMiddleware.use(req as Request, resp, next)
            ).toThrow();
        });
    });
});

describe('Given AuthMiddleware', () => {
    let authMiddleware: AuthMiddleware;

    const req = {
        get: jest.fn().mockReturnValue(null),
    };
    const resp = {} as Response;
    const next = jest.fn();
    describe('When calling use method without token', () => {
        const mockAuthServiceBad = {
            validateToken: jest.fn().mockReturnValue(null),
            createToken: jest.fn(),
        } as AuthService;
        test('Then it should call next function with no errors', () => {
            authMiddleware = new AuthMiddleware(mockAuthServiceBad);
            expect(() => authMiddleware.use(req, resp, next)).toThrow();
        });
    });
});
