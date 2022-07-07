import {
    Injectable,
    NestMiddleware,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtPayload } from 'jsonwebtoken';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { iCharacter } from '../character/entities/character.entity';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserRequiredMiddleware implements NestMiddleware {
    constructor(
        @InjectModel('Character') private readonly Character: Model<iCharacter>,
        private readonly auth: AuthService
    ) {}
    async use(req: any, res: any, next: () => void) {
        const token = req.get('Authorization');
        if (!token) throw new UnauthorizedException("Token doesn't exist");
        let tokenData: string | JwtPayload;
        try {
            tokenData = this.auth.validateToken(token.substring(7));
        } catch (error) {
            throw new UnauthorizedException('Session expired');
        }
        if (typeof tokenData === 'string')
            throw new UnauthorizedException('Token invalid');

        const userId = tokenData.id as string;
        const findCharacter = await this.Character.findById(req.params.id);

        if (String(findCharacter.player) === String(userId)) {
            next();
        } else {
            throw new UnauthorizedException('Not allowed');
        }
    }
}
