import { Module } from '@nestjs/common';
import {UserService} from '../services/user.service'
import {TypeOrmModule} from '@nestjs/typeorm'
import {User} from '../domain/users/User'
import { UserController } from '../controllers/user.controller';
import { RegisterCommandHandler } from '@applications/user/commands/register/RegisterCommandHandler';
import { SendCaptchaCommandHandler } from '@applications/user/commands/sendCaptcha/SendCaptchaCommandHandler';
import { LoginCommandHandler } from '@applications/user/commands/login/LoginCommandHandler';
import { RefreshTokenCommandHandler } from '@applications/user/commands/refreshToken/RefreshTokenCommandHandler';
import { UpdatePasswordCommandHandler } from '@applications/user/commands/updatePassword/UpdatePasswordCommandHandler';
import { UpdateFrozenStatusCommandHandler } from '@applications/user/commands/updateFrozenStatus/UpdateFrozenStatusCommandHandler';
import { GetUsersQueryHandler } from '@applications/user/queries/getUsers/GetUsersQueryHandler';
import { RegisterCommandValidation } from '@applications/user/commands/register/RegisterCommandValidation';
import { LoginCommandValidation } from '@applications/user/commands/login/LoginCommandValidation';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService, 

    RegisterCommandHandler, 
    RegisterCommandValidation,

    SendCaptchaCommandHandler, 

    LoginCommandHandler, 
    LoginCommandValidation,
    
    RefreshTokenCommandHandler,
    UpdatePasswordCommandHandler,
    UpdateFrozenStatusCommandHandler,
    GetUsersQueryHandler
  ],
  exports: [UserService]
})
export class UserModule {}
