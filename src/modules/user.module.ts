import { Module } from '@nestjs/common';
import {UserService} from '../services/user.service'
import {TypeOrmModule} from '@nestjs/typeorm'
import {User} from '../domain/users/User'
import { UserController } from '../controllers/user.controller';
import { RegisterCommandHandler } from '@applications/user/commands/register/RegisterCommandHandler';
import { SendCaptchaCommandHandler } from '@applications/user/commands/sendCaptcha/SendCaptchaCommandHandler';
import { LoginCommandHandler } from '@applications/user/commands/login/LoginCommandHandler';
import { RefreshTokenCommandHandler } from '@applications/user/commands/refreshToken/RefreshTokenCommandHandler';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, RegisterCommandHandler, SendCaptchaCommandHandler, LoginCommandHandler, RefreshTokenCommandHandler],
  exports: [UserService]
})
export class UserModule {}
