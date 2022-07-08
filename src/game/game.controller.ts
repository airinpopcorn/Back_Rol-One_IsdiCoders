import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';

@Controller('game')
export class GameController {
    constructor(private readonly gameService: GameService) {}

    @Post()
    async create(@Body() createGameDto: CreateGameDto) {
        return await this.gameService.create(createGameDto);
    }

    @Get('')
    async findAll() {
        return await this.gameService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.gameService.findOne(id);
    }

    @Patch('/addCharacter/:id')
    async update(
        @Param('id') id: string,
        @Body() body: { idCharacter: string }
    ) {
        return await this.gameService.addNewCharacterToGame(
            id,
            body.idCharacter
        );
    }
}
