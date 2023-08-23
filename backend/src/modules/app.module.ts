import { Module } from '@nestjs/common';
import { MediatorModule } from '@libs/mediator';
import {EventbusModule} from '@libs/eventbus'
import {TypeOrmModule} from '@nestjs/typeorm'
import {User} from '../domain/users/User'
import {Permission} from '../domain/permissions/Permission'
import {Role} from '../domain/roles/Role'
import {ConfigModule, ConfigService} from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user.module';
import { RedisModule } from './redis.module';
import { EmailModule } from './email.module';
import { RoleModule } from './role.module';
import { APP_GUARD } from '@nestjs/core';
import { LoginGuard } from '../guards/login.guard';
import { RoomModule } from './room.module';
import { Room } from '../domain/rooms/Room';

@Module({
  imports: [
    UserModule, 
    RedisModule, 
    EmailModule, 
    RoleModule,

    MediatorModule, 

    EventbusModule,


    JwtModule.registerAsync({
      global: true,
      useFactory(configService: ConfigService) {
        return {
          secret: configService.get('jwt_secret'),
          signOptions: {
            expiresIn: configService.get('jwt_access_token_expires_time')
          }
        }
      },
      inject: [ConfigService]
    }),

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
          entities: [User, Permission, Role, Room],
          // logger: process.env.NODE_ENV === 'development' ? 'simple-console' : undefined
        }
      },
      inject: [ConfigService]
    }),
    RoomModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: LoginGuard
    },
  ]
})
export class AppModule {}
