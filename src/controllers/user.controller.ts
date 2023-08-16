import { RegisterCommand } from '@applications/user/commands/register/RegisterCommand';
import { RegisterRequest } from '@applications/user/commands/register/RegisterRequest';
import { SendCaptchaCommand } from '@applications/user/commands/sendCaptcha/SendCaptchaCommand';
import { SendCaptchaRequest } from '@applications/user/commands/sendCaptcha/SendCaptchaRequest';
import { MediatorService } from '@libs/mediator';
import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';

@Controller('user')
export class UserController {

  @Inject(MediatorService)
  private _mediator: MediatorService

  @Post('captcha/send')
  async captcha(@Body() body: SendCaptchaRequest) {
    const command = new SendCaptchaCommand(body.email)
    await this._mediator.send(command)
  }

  @Post('register')
  async register(@Body() registerUser: RegisterRequest) {
    const command = new RegisterCommand({
      ...registerUser,
      captcha: +registerUser.captcha
    })
    await this._mediator.send(command)
  }

}
