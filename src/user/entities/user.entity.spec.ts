import { isEmail } from './user.entity';

describe('Given isEmail function', () => {
    describe('When calling it to validate the email', () => {
        test('Then it should return true if it is a validate email', () => {
            const result = isEmail('email@gmail.com');
            expect(result).toBeTruthy();
        });
        test('Then it should return false if it is a non validate email', () => {
            const result = isEmail('');
            expect(result).toBeFalsy();
        });
    });
});
