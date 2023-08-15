import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MediatorModule } from '@libs/mediator';
import { IndexModule } from './modules/index.module';
import {TypeOrmModule} from '@nestjs/typeorm'
import {User} from './domain/users/User'
import {Permission} from './domain/permissions/Permission'
import {Role} from './domain/roles/Role'

@Module({
  imports: [
    MediatorModule, 
    IndexModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: "mongodb://root:root@localhost:27017/?authSource=admin",
      database: 'meeting_room',
      entities: [User, Permission, Role],
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
