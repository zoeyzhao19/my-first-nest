import { LoginCommand } from '@applications/user/commands/login/LoginCommand';
import { LoginRequest } from '@applications/user/commands/login/LoginRequest';
import { RefreshTokenCommand } from '@applications/user/commands/refreshToken/RefreshTokenCommand';
import { RefreshTokenRequest } from '@applications/user/commands/refreshToken/RefreshTokenRequest';
import { RegisterCommand } from '@applications/user/commands/register/RegisterCommand';
import { RegisterRequest } from '@applications/user/commands/register/RegisterRequest';
import { SendCaptchaCommand } from '@applications/user/commands/sendCaptcha/SendCaptchaCommand';
import { SendCaptchaRequest } from '@applications/user/commands/sendCaptcha/SendCaptchaRequest';
import { MediatorService } from '@libs/mediator';
import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { RequireLogin, UserInfo } from '../decorators/requre-login.decorator';
import { UpdatePassRequest } from '@applications/user/commands/updatePassword/UpdatePasswordRequest';
import { UpdatePasswordCommand } from '@applications/user/commands/updatePassword/UpdatePasswordCommand';
import { Request } from 'express';
import {ApiTags, ApiBearerAuth} from '@nestjs/swagger'
import { UpdateFrozenStatusCommand } from '@applications/user/commands/updateFrozenStatus/UpdateFrozenStatusCommand';
import { GetUserQuery } from '@applications/user/queries/getUsers/GetUsersQuery';
import { GetUsersRequest } from '@applications/user/queries/getUsers/GetUsersRequest';

@Controller('user')
@ApiTags('user module')
export class UserController {

  @Inject(MediatorService)
  private _mediator: MediatorService

  @Post('captcha/register')
  @HttpCode(200)
  async registerCaptcha(@Body() body: SendCaptchaRequest) {
    const command = new SendCaptchaCommand(body.email, 'register')
    await this._mediator.send(command)
  }

  @Post('register')
  @HttpCode(200)
  async register(@Body() body: RegisterRequest) {
    const command = new RegisterCommand({
      ...body,
      captcha: +body.captcha
    })
    await this._mediator.send(command)
  }

  @Post('login')
  @HttpCode(200)
  async userLogin(@Body() body: LoginRequest) {
    const command = new LoginCommand(body.username, body.password)

    const result = await this._mediator.send(command)

    return result
  }

  @Post('token/refresh')
  @HttpCode(200)
  async refreshToken(@Body() body: RefreshTokenRequest) {
    const command = new RefreshTokenCommand(body.refresh_token)

    const result = await this._mediator.send(command)

    return result
  }

  @RequireLogin()
  @ApiBearerAuth()
  @Post('password/update')
  @HttpCode(200)
  async updatePassword(@UserInfo() userInfo: Request['user'], @Body() body: UpdatePassRequest) {
    const command = new UpdatePasswordCommand({
      id: userInfo.id,
      email: userInfo.email,
      old_password: body.old_password,
      new_password: body.new_password,
      captcha: +body.captcha
    })
    await this._mediator.send(command)
  }

  @Post('captcha/update_password')
  @HttpCode(200)
  async updatePasswordCaptcha(@Body() body: SendCaptchaRequest) {
    const command = new SendCaptchaCommand(body.email, 'update_password')
    await this._mediator.send(command)
  }

  @Post('unfreeze')
  @RequireLogin()
  @ApiBearerAuth()
  @HttpCode(200)
  async unfreeze(@UserInfo() userInfo: Request['user']) {
    const command = new UpdateFrozenStatusCommand(userInfo.id, 'unfrozen')
    await this._mediator.send(command)
  }

  @Post('freeze')
  @RequireLogin()
  @ApiBearerAuth()
  @HttpCode(200)
  async freeze(@UserInfo() userInfo: Request['user']) {
    const command = new UpdateFrozenStatusCommand(userInfo.id, 'frozen')
    await this._mediator.send(command)
  }

  @Post('list')
  @RequireLogin()
  @ApiBearerAuth()
  @HttpCode(200)
  async getList(@Body() body: GetUsersRequest) {
    const query = new GetUserQuery(
      body.username,
      body.email,
      body.nickname,
      +body.pageNum ?? 1,
      +body.pageSize ?? 20
    )
    const result = await this._mediator.send(query)

    return result
  }

}
