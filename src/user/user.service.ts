import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { iUser } from './entities/user.entity';
import { AuthService } from '../auth/auth.service';
import { BcryptService } from '../auth/bcrypt.service';
import { JwtPayload } from 'jsonwebtoken';

AuthService;
@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly User: Model<iUser>,
        private readonly auth: AuthService,
        private readonly bcrypt: BcryptService
    ) {}
    async create(createUserDto: CreateUserDto) {
        try {
            const newUser = await this.User.create({
                ...createUserDto,
                password: this.bcrypt.encrypt(createUserDto.password),
            });
            const token = this.auth.createToken(newUser.id);
            return { user: newUser, token };
        } catch (error) {
            throw new UnauthorizedException('Fail data required');
        }
    }

    async login(loginData: { email: string; password: string }) {
        const user = await this.User.findOne({ email: loginData.email });
        if (
            user === null ||
            !this.bcrypt.compare(loginData.password, user.password)
        )
            throw new UnauthorizedException('Password or email not correct');
        const token = this.auth.createToken(user.id);
        return {
            user,
            token,
        };
    }

    async loginWithToken(token: string) {
        try {
            const tokenData = this.auth.validateToken(
                token.substring(7)
            ) as JwtPayload;
            if (typeof tokenData === 'string')
                throw new UnauthorizedException();
            const user = await this.User.findById(tokenData.id);
            if (!user) throw new NotFoundException('User does not exist');
            const newToken = this.auth.createToken(user.id);
            return {
                user,
                token: newToken,
            };
        } catch (error) {
            throw new UnauthorizedException('Session expired');
        }
    }

    async findAll() {
        return await this.User.find().populate('characters');
    }

    async findOne(id: string) {
        return await this.User.findById(id).populate('characters');
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        return this.User.findByIdAndUpdate(id, updateUserDto, { new: true });
    }

    async remove(id: string) {
        return await this.User.findByIdAndDelete(id);
    }
}
