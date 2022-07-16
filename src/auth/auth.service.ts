import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
    createToken(id: string) {
        const secret = process.env.SECRET;
        return jwt.sign({ id }, secret);
    }

    validateToken(token: string) {
        const secret = process.env.SECRET;
        return jwt.verify(token, secret);
    }
}
