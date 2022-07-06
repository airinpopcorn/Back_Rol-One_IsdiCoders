/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './entities/user.entity';
import { AuthService } from '../auth/auth.service';
import { BcryptService } from '../auth/bcrypt.service';
@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: userSchema }]),
    ],
    controllers: [UserController],
    providers: [UserService, AuthService, BcryptService],
})
export class UserModule {}
