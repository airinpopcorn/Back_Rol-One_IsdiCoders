import {
    Injectable,
    NestMiddleware,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtPayload } from 'jsonwebtoken';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly auth: AuthService) {}
    use(req: any, res: any, next: () => void) {
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
        next();
    }
}
