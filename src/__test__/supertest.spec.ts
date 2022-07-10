import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { CreateGameDto } from '../game/dto/create-game.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { CreateCharacterDto } from '../character/dto/create-character.dto';

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

describe('Given the routes /game', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        // User sign up
        const response: request.Response = await request(app.getHttpServer())
            .post('/user')
            .send(mockUser)
            .set('Accept', 'application/json');
        userId = response.body.user._id;
        userToken = response.body.token;
    });

    afterAll(async () => {
        await request(app.getHttpServer())
            .delete('/user/' + userId)
            .set('Authorization', 'bearer ' + userToken);
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

describe('Given the routes /character', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        // User sign up
        const response: request.Response = await request(app.getHttpServer())
            .post('/user')
            .send(mockUser)
            .set('Accept', 'application/json');
        userId = response.body.user._id;
        userToken = response.body.token;
    });

    afterAll(async () => {
        await request(app.getHttpServer())
            .delete('/user/' + userId)
            .set('Authorization', 'bearer ' + userToken);

        await app.close();
    });

    test('/character (POST)', async () => {
        const response = await request(app.getHttpServer())
            .post('/character')
            .send({ ...mockCharacter, idGame: gameId, player: userId })
            .set('Authorization', 'bearer ' + userToken);

        expect(response.status).toBe(201);
        characterId = response.body._id;
    });

    test('/character (GET)', async () => {
        const response = await request(app.getHttpServer())
            .get('/character')
            .set('Authorization', 'bearer ' + userToken);
        expect(response.status).toBe(200);
    });

    test('/character/:id (GET)', async () => {
        const response = await request(app.getHttpServer())
            .get('/character/' + characterId)
            .set('Authorization', 'bearer ' + userToken);
        expect(response.status).toBe(200);
    });

    test('/character/:id (PATCH)', async () => {
        const response = await request(app.getHttpServer())
            .patch('/character/' + characterId)
            .set('Authorization', 'bearer ' + userToken);
        expect(response.status).toBe(200);
    });

    test('/character/:id (DELETE)', async () => {
        const response = await request(app.getHttpServer())
            .delete('/character/' + characterId)
            .set('Authorization', 'bearer ' + userToken);
        expect(response.status).toBe(200);
    });
});

describe('Given the routes /user', () => {
    let app: INestApplication;

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

    test('/user (POST)', async () => {
        const response: request.Response = await request(app.getHttpServer())
            .post('/user')
            .send(mockUser)
            .set('Accept', 'application/json');

        expect(response.status).toBe(201);
    });

    test('/user/login (POST)', async () => {
        const response = await request(app.getHttpServer())
            .post('/user/login')
            .send({
                email: 'test@gmail.com',
                password: '12345',
            })
            .set('Accept', 'application/json');
        expect(response.status).toBe(201);
        userId = response.body.user._id;
        userToken = response.body.token;
    });

    test('/user (GET)', async () => {
        const response = await request(app.getHttpServer())
            .get('/user')
            .set('Authorization', 'bearer ' + userToken);
        expect(response.status).toBe(200);
    });

    test('/character/:id (GET)', async () => {
        const response = await request(app.getHttpServer())
            .get('/user/' + userId)
            .set('Authorization', 'bearer ' + userToken);
        expect(response.status).toBe(200);
    });

    test('/user/:id (PATCH)', async () => {
        const response = await request(app.getHttpServer())
            .patch('/user/' + userId)
            .send({ name: 'update name' })
            .set('Authorization', 'bearer ' + userToken);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe('update name');
    });

    test('/user/:id (DELETE)', async () => {
        const response = await request(app.getHttpServer())
            .delete('/user/' + userId)
            .set('Authorization', 'bearer ' + userToken);
        expect(response.status).toBe(200);
    });
});
