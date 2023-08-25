import { MediatorHandler, IRequestHandler } from "@libs/mediator";
import { GetRoomQuery } from "./GetRoomQuery";
import { RoomService } from "@services/room.service";
import { Inject } from "@nestjs/common";

@MediatorHandler(GetRoomQuery)
export class GetRoomQueryHandler implements IRequestHandler<GetRoomQuery> {

  @Inject(RoomService)
  private roomService: RoomService

  async handle(command: GetRoomQuery) {
    const [rooms, total] = await this.roomService.getList(command.pageNum, command.pageSize, command.name)
    
    const list = rooms.map(item => {
      return {
        id: item.id.toString(),
        name: item.name,
        status: item.state.status
      }
    })

    return {
      list,
      total
    }
  }
}