import { CommandHandler, IRequestHandler } from "@libs/mediator";
import { GetUserQuery } from "./GetUsersQuery";
import { Inject, Injectable } from "@nestjs/common";
import { UserService } from "@services/user.service";

@Injectable()
@CommandHandler(GetUserQuery)
export class GetUsersQueryHandler implements IRequestHandler<GetUserQuery> {

  @Inject(UserService)
  private userService: UserService

  async handle(command: GetUserQuery) {
    console.log('handle')
    const [users, total] = await this.userService.getList(
      command.pageNum, 
      command.pageSize,
      command.username, 
      command.email, 
      command.nickname
    )
    console.log({users})

    const list = users.map(item => {
      return {
        id: item.id.toString(),
        username: item.username.value,
        email: item.email.value,
        nickname: item.nickname.value,
        headPic: item.headPic,
        isFrozen: item.isFrozen,
        isAdmin: item.isAdmin
      }
    })

    return {
      list,
      total
    }
  }
}