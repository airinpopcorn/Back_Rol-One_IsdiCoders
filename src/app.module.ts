/* istanbul ignore file */
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { GameModule } from './game/game.module';
import { CharacterModule } from './character/character.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { AuthService } from './auth/auth.service';
import { BcryptService } from './auth/bcrypt.service';

import { characterSchema } from './character/entities/character.entity';
import { UserRequiredMiddleware } from './middlewares/user.required.middleware';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(
            process.env.NODE_ENV === 'test'
                ? process.env.URL_MONGO_TEST
                : process.env.URL_MONGO
        ),
        UserModule,
        GameModule,
        CharacterModule,
        MongooseModule.forFeature([
            { name: 'Character', schema: characterSchema },
        ]),
    ],
    controllers: [AppController],
    providers: [AppService, AuthService, UserRequiredMiddleware, BcryptService],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .exclude(
                { path: 'game', method: RequestMethod.ALL },
                { path: 'game/:id', method: RequestMethod.ALL },
                // { path: 'game/addCharacter/:id', method: RequestMethod.PATCH },
                { path: 'user', method: RequestMethod.POST },
                { path: 'user/login', method: RequestMethod.POST }
            )
            .forRoutes('*');
        consumer
            .apply(UserRequiredMiddleware)
            .forRoutes(
                { path: 'user', method: RequestMethod.PATCH },
                { path: 'user', method: RequestMethod.DELETE }
            );
    }
}
