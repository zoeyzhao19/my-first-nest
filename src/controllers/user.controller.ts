import { RegisterCommand } from '@applications/user/commands/register/RegisterCommand';
import { RegisterRequest } from '@applications/user/commands/register/RegisterRequest';
import { MediatorService } from '@libs/mediator';
import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { UserService } from '@services/user.service';

@Controller('user')
export class UserController {

  @Inject(MediatorService)
  private _mediator: MediatorService

  @Post('register')
  async register(@Body() registerUser: RegisterRequest) {
    const command = new RegisterCommand(registerUser)
    await this._mediator.send(command)
  }

}
