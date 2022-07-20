import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { iUser } from './entities/user.entity';
import { AuthService } from '../auth/auth.service';
import { BcryptService } from '../auth/bcrypt.service';
import { JwtPayload } from 'jsonwebtoken';
import { iCharacter } from '../character/entities/character.entity';
import { iGame } from '../game/entities/game.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly User: Model<iUser>,
        @InjectModel('Character') private readonly Character: Model<iCharacter>,
        @InjectModel('Game') private readonly Game: Model<iGame>,
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
        const user = await this.User.findOne({
            email: loginData.email,
        }).populate('characters');
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
            if (typeof tokenData === 'string') {
                throw new UnauthorizedException();
            }

            const user = await await this.User.findById(tokenData.id).populate(
                'characters'
            );

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
        const findUser = await this.User.findById(id);

        const arrayCharacterOfUser = findUser.characters;

        const charactersInUser = [];
        arrayCharacterOfUser.forEach((item) =>
            charactersInUser.push(item.toString())
        );
        charactersInUser.forEach(async (item) => {
            const foundGame = await this.Game.find({
                characters: { $in: item },
            });

            await this.Character.deleteMany({
                id: { $in: foundGame.toString() },
            });
        });

        const deleteUser = findUser.delete();

        return deleteUser;
    }
}
