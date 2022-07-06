/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuthService } from './auth.service';
import { sign, verify } from 'jsonwebtoken';

jest.mock('jsonwebtoken');
const mockSign = jest.fn();
const mockVerify = jest.fn();
(sign as jest.Mock) = mockSign;
(verify as jest.Mock) = mockVerify;

describe('AuthService', () => {
    describe('When calling createToken method', () => {
        test('Then jwt.sign should be called', () => {
            AuthService.prototype.createToken('');
            expect(mockSign).toHaveBeenCalled();
        });
    });
    describe('When calling decodeToken method', () => {
        test('Then jwt.verify should be called', () => {
            AuthService.prototype.validateToken('');
            expect(mockVerify).toHaveBeenCalled();
        });
    });
});
