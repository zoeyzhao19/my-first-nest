import { IRequestHandler, registerHandler } from "@libs/mediator";
import { UpdatePasswordCommand } from "./UpdatePasswordCommand";
import { Inject, Injectable } from "@nestjs/common";
import { UserService } from "@services/user.service";
import { JwtService } from "@nestjs/jwt";
import { RedisService } from "@services/redis.service";
import { UserError } from "@errors/UserError";

@Injectable()
@registerHandler(UpdatePasswordCommand)
export class UpdatePasswordCommandHandler implements IRequestHandler<UpdatePasswordCommand> {

  @Inject(UserService)
  private userService: UserService

  @Inject(RedisService)
  private redisService: RedisService

  async handle(command: UpdatePasswordCommand) {
    const captcha = await this.redisService.get(`captcha_update_password_${command.email}`)

    if(!captcha) {
      throw new UserError(UserError.CaptchaExpired)
    } 

    if(+captcha !== command.captcha) {
      throw new UserError(UserError.CaptchaIncorrect)
    }

    await this.userService.updatePassword(command.id, command.old_password, command.new_password)
  }
}