import { AggregateRoot } from "@libs/domain";
import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";
import { State } from "./State";
import { AvailableState } from "./AvailableState";
import { RoomStatus } from "@shared/status";
import { InuseState } from "./InuseState";
import { RoomError } from "@errors/RoomError";
import { BookedState } from "./BookedState";

@Entity({
  name: 'rooms'
})
export class Room extends AggregateRoot {

  @ObjectIdColumn()
  public id: ObjectId

  /**
   * 会议室名
   */
  @Column()
  name: string;

  @Column()
  state: State

  /**
   * 规模（人数）
   */
  @Column()
  scale: number

  constructor(name: string, scale: number, state: State) {
    super()
    this.name = name
    this.state = state
    this.scale = scale
  }

  book() {
    this.state = this.state.book()
  }

  use() {
    this.state = this.state.use()
  }

  release() {
    this.state = this.state.release()
  }

  // TODO in mappings/mapper
  // find other way to mapper
  static fromPrimitive(id: ObjectId, name: string, scale: number, status: RoomStatus) {
    let state: State
    switch(status) {
      case RoomStatus.Available:
        state = new AvailableState()
        break;
      case RoomStatus.Inuse:
        state = new InuseState()
        break;
      case RoomStatus.Booked:
        state = new BookedState()
        break;
      default:
        throw new RoomError(RoomError.InvalidRoomStatus)
    }
    const room = new Room(name, scale, state)
    return room
  }

}