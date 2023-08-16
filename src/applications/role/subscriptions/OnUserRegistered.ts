import { Inject, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { RoleService } from "@services/role.service";
import { UserService } from "@services/user.service";
import { UserRegisteredDomainEvent } from "src/domain/users/events/UserRegisteredDomainEvent";

@Injectable()
export class OnUserRegistered {

  @Inject(RoleService)
  private roleService: RoleService

  @Inject(UserService)
  private userService: UserService

  @OnEvent(UserRegisteredDomainEvent.EVENT_NAME)
  async on(events: UserRegisteredDomainEvent[]) {
    for(const event of events) {
      const user = event.user
      const role = await this.roleService.findRole(user.isAdmin ? '管理员' : '普通用户')
      await this.userService.updateRoles(user, [role])
    }
  }
}