/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { characterSchema } from './entities/character.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { gameSchema } from 'src/game/entities/game.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Character', schema: characterSchema },
            { name: 'Game', schema: gameSchema },
        ]),
    ],
    controllers: [CharacterController],
    providers: [CharacterService],
})
export class CharacterModule {}
