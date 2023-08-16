import { LoginCommand } from '@applications/user/commands/login/LoginCommand';
import { LoginRequest } from '@applications/user/commands/login/LoginRequest';
import { RefreshTokenCommand } from '@applications/user/commands/refreshToken/RefreshTokenCommand';
import { RefreshTokenRequest } from '@applications/user/commands/refreshToken/RefreshTokenRequest';
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
  async register(@Body() body: RegisterRequest) {
    const command = new RegisterCommand({
      ...body,
      captcha: +body.captcha
    })
    await this._mediator.send(command)
  }

  @Post('login')
  async userLogin(@Body() body: LoginRequest) {
    const command = new LoginCommand(body.username, body.password)

    const result = await this._mediator.send(command)

    return result
  }

  @Post('token/refresh')
  async refreshToken(@Body() body: RefreshTokenRequest) {
    const command = new RefreshTokenCommand(body.refresh_token)

    const result = await this._mediator.send(command)

    return result
  }

}
