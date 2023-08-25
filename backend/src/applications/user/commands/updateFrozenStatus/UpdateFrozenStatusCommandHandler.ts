import { MediatorHandler, IRequestHandler } from "@libs/mediator";
import { UpdateFrozenStatusCommand } from "./UpdateFrozenStatusCommand";
import { Inject, Injectable } from "@nestjs/common";
import { UserService } from "@services/user.service";

@Injectable()
@MediatorHandler(UpdateFrozenStatusCommand)
export class UpdateFrozenStatusCommandHandler implements IRequestHandler<UpdateFrozenStatusCommand> {

  @Inject(UserService)
  private userService: UserService

  async handle(command: UpdateFrozenStatusCommand) {
    if(command.operation === 'frozen') {
      await this.userService.freeze(command.userId)
    } else {
      await this.userService.unfreeze(command.userId)
    }
  }
} 