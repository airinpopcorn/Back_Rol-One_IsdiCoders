/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './entities/user.entity';
import { AuthService } from '../auth/auth.service';
import { BcryptService } from '../auth/bcrypt.service';
import { gameSchema } from '../game/entities/game.entity';
import { characterSchema } from '../character/entities/character.entity';
@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'User', schema: userSchema },
            { name: 'Character', schema: characterSchema },
            { name: 'Game', schema: gameSchema },
        ]),
    ],
    controllers: [UserController],
    providers: [UserService, AuthService, BcryptService],
})
export class UserModule {}
