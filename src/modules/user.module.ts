import { Module } from '@nestjs/common';
import {UserService} from '../services/user.service'
import {TypeOrmModule} from '@nestjs/typeorm'
import {User} from '../domain/users/User'
import { UserController } from '../controllers/user.controller';
import { RegisterCommandHandler } from '@applications/user/commands/register/RegisterCommandHandler';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, RegisterCommandHandler]
})
export class UserModule {}
