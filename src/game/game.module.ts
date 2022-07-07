/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { gameSchema } from './entities/game.entity';
import { characterSchema } from '../character/entities/character.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Game', schema: gameSchema },
            { name: 'Character', schema: characterSchema },
        ]),
    ],
    controllers: [GameController],
    providers: [GameService],
})
export class GameModule {}
