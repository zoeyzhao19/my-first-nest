import { IRequestHandler, registerHandler } from "@libs/mediator";
import { RegisterCommand } from "./RegisterCommand";
import { Inject, Injectable } from "@nestjs/common";
import { UserService } from "@services/user.service";
import { RedisService } from "@services/redis.service";
import { UserError } from "@errors/UserError";

@registerHandler(RegisterCommand)
@Injectable()
export class RegisterCommandHandler implements IRequestHandler<RegisterCommand> {
  @Inject(UserService)
  private userService: UserService

  @Inject(RedisService)
  private redisService: RedisService

  async handle(command: RegisterCommand) {
    const captcha = await this.redisService.get(`captcha_${command.email}`)

    if(!captcha) {
      throw new UserError(UserError.CaptchaExpired)
    }

    if(+captcha !== command.captcha) {
      throw new UserError(UserError.CaptchaIncorrect)
    }

    await this.userService.register({
      email: command.email,
      password: command.password,
      username: command.username,
      nickname: command.nickname
    })
  }
}