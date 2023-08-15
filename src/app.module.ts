import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MediatorModule } from '@libs/mediator';
import { IndexModule } from './modules/index.module';
import {TypeOrmModule} from '@nestjs/typeorm'
import {User} from './domain/users/User'
import {Permission} from './domain/permissions/Permission'
import {Role} from './domain/roles/Role'
import {ConfigModule, ConfigService} from '@nestjs/config'

@Module({
  imports: [
    MediatorModule, 
    IndexModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['src/.env', process.env.NODE_ENV === 'development' ? 'src/.env.development' : 'src/.env.production']
    }),
    TypeOrmModule.forRootAsync({
      useFactory(configService: ConfigService) {
        return {
          type: 'mongodb',
          url: configService.get('mongo_connection_url'),
          database: configService.get('mongo_database'),
          entities: [User, Permission, Role],
          // logger: process.env.NODE_ENV === 'development' ? 'simple-console' : undefined
        }
      },
      inject: [ConfigService]
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
