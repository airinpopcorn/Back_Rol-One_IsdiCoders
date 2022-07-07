import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class BcryptService {
    encrypt(password: string) {
        if (!password) return;
        return bcrypt.hashSync(password);
    }

    compare(password: string, hash: string) {
        return bcrypt.compareSync(password, hash);
    }
}
