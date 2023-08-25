import { IRequestHandler, MediatorHandler } from "@libs/mediator";
import { UpdatePasswordCommand } from "./UpdatePasswordCommand";
import { Inject, Injectable } from "@nestjs/common";
import { UserService } from "@services/user.service";
import { RedisService } from "@services/redis.service";
import { UserError } from "@errors/UserError";

@Injectable()
@MediatorHandler(UpdatePasswordCommand)
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