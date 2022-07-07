/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { characterSchema } from './entities/character.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { gameSchema } from '../game/entities/game.entity';
import { userSchema } from '../user/entities/user.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Character', schema: characterSchema },
            { name: 'Game', schema: gameSchema },
            { name: 'User', schema: userSchema },
        ]),
    ],
    controllers: [CharacterController],
    providers: [CharacterService],
})
export class CharacterModule {}
