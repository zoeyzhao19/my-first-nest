import { IRequestHandler, registerHandler } from "@libs/mediator";
import { UpdatePasswordCommand } from "./UpdatePasswordCommand";
import { Inject, Injectable } from "@nestjs/common";
import { UserService } from "@services/user.service";
import { RedisService } from "@services/redis.service";
import { UserError } from "@errors/UserError";
import { MongoEntityManager } from "typeorm";
import { InjectEntityManager } from "@nestjs/typeorm";

@Injectable()
@registerHandler(UpdatePasswordCommand)
export class UpdatePasswordCommandHandler implements IRequestHandler<UpdatePasswordCommand> {

  @Inject(UserService)
  private userService: UserService

  @Inject(RedisService)
  private redisService: RedisService

  @InjectEntityManager()
  private entityManager: MongoEntityManager

  async handle(command: UpdatePasswordCommand) {
    const session = this.entityManager.mongoQueryRunner.databaseConnection.startSession();
    try {
      await session.withTransaction(async () => {
        // const captcha = await this.redisService.get(`captcha_update_password_${command.email}`)

        // if(!captcha) {
        //   throw new UserError(UserError.CaptchaExpired)
        // } 

        // if(+captcha !== command.captcha) {
        //   throw new UserError(UserError.CaptchaIncorrect)
        // }

        await this.userService.updatePassword(command.id, command.old_password, command.new_password)
        throw new Error('test')
      })
    } catch (err) {
      throw err
    } finally {
      await session.endSession()
    }
  }
}