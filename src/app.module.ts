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

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.URL_MONGO),
        UserModule,
        GameModule,
        CharacterModule,
    ],
    controllers: [AppController],
    providers: [AppService, AuthService, BcryptService],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .exclude(
                { path: 'game', method: RequestMethod.ALL },
                { path: 'game', method: RequestMethod.GET },
                { path: 'user', method: RequestMethod.POST }
            )
            .forRoutes('*');
    }
}
