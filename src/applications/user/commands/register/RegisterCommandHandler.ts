import { IRequestHandler, registerHandler } from "@libs/mediator";
import { RegisterCommand } from "./RegisterCommand";
import { Inject, Injectable } from "@nestjs/common";
import { UserService } from "@services/user.service";

@registerHandler(RegisterCommand)
@Injectable()
export class RegisterCommandHandler implements IRequestHandler<RegisterCommand> {
  @Inject(UserService)
  private userService: UserService

  async handle(command: RegisterCommand) {
    await this.userService.register({
      email: command.email,
      password: command.password,
      username: command.username,
      nickname: command.nickname
    })
  }
}