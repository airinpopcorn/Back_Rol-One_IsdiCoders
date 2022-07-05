import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { characterSchema } from './entities/character.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Character', schema: characterSchema },
        ]),
    ],
    controllers: [CharacterController],
    providers: [CharacterService],
})
export class CharacterModule {}
