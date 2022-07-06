/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { gameSchema } from './entities/game.entity';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Game', schema: gameSchema }]),
    ],
    controllers: [GameController],
    providers: [GameService],
})
export class GameModule {}
