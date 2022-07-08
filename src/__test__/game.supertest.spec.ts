import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../app.module';
import { CreateGameDto } from '../game/dto/create-game.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { CreateCharacterDto } from '../character/dto/create-character.dto';

describe('Given the routes /game', () => {
    let app: INestApplication;
    let userId: string;
    let userToken: string;
    let characterId: string;
    let gameId: string;

    const mockGame: CreateGameDto = {
        title: 'test',
        creator: 'testCreator',
        description: 'description',
        image: 'string',
        characters: [],
    };

    const mockUser: CreateUserDto = {
        name: 'testUser',
        email: 'test@gmail.com',
        password: '12345',
        role: 'master',
        characters: [],
    };

    const mockCharacter: CreateCharacterDto = {
        name: 'testCharacter',
        life: '1',
        strength: '2',
        constitution: '3',
        intelligence: '4',
        idGame: '',
        player: '',
    };

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    test('/game (POST)', async () => {
        const response = await request(app.getHttpServer())
            .post('/game')
            .send(mockGame)
            .set('Accept', 'application/json');
        expect(response.status).toBe(201);
        gameId = response.body._id;
    });

    test('/game (GET)', async () => {
        const response = await request(app.getHttpServer())
            .get('/game')
            .set('Accept', 'application/json');
        expect(response.status).toBe(200);
    });

    test('/game/:id (GET)', async () => {
        const response = await request(app.getHttpServer())
            .get('/game/' + gameId)
            .set('Accept', 'application/json');
        expect(response.status).toBe(200);
    });

    test('/user (POST)', async () => {
        const response = await request(app.getHttpServer())
            .post('/user')
            .send(mockUser)
            .set('Accept', 'application/json');
        userId = response.body.user._id;
        userToken = response.body.token;
    });

    test('/character (POST)', async () => {
        const response = await request(app.getHttpServer())
            .post('/character')
            .send({ ...mockCharacter, idGame: gameId, player: userId })
            .set('Authorization', 'bearer ' + userToken);
        expect(response.status).toBe(201);
        characterId = response.body._id;
    });

    test('/game/addCharacter/:id (PATCH)', async () => {
        const response = await request(app.getHttpServer())
            .patch('/game/addCharacter/' + gameId)
            .send({ idCharacter: characterId })
            .set('Authorization', 'bearer ' + userToken);
        expect(response.status).toBe(200);
    });
});
