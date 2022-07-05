import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { characterSchema } from '../character/entities/character.entity';
import { gameSchema } from './entities/game.entity';
import { GameService } from './game.service';

describe('GameService', () => {
    let service: GameService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                MongooseModule.forFeature([
                    { name: 'Game', schema: gameSchema },
                    { name: 'Character', schema: characterSchema },
                ]),
            ],
            providers: [GameService],
        }).compile();

        service = module.get<GameService>(GameService);
    });

    test.todo(
        'should be defined'
        // , () => {
        //     expect(service).toBeDefined();
        // }
    );
});
