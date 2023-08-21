import { EventHandler, IDomainEventHandler } from "@libs/eventbus";
import { Inject, Injectable } from "@nestjs/common";
import { RoleService } from "@services/role.service";
import { UserService } from "@services/user.service";
import { UserRegisteredDomainEvent } from "src/domain/users/events/UserRegisteredDomainEvent";

@Injectable()
@EventHandler(UserRegisteredDomainEvent)
export class OnUserRegistered implements IDomainEventHandler {

  @Inject(RoleService)
  private roleService: RoleService

  @Inject(UserService)
  private userService: UserService

  async on(event: UserRegisteredDomainEvent) {
    const user = event.user
    const role = await this.roleService.findRole(user.isAdmin ? '管理员' : '普通用户')
    await this.userService.updateRoles(user, [role])
  }
}