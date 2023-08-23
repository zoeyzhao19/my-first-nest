import { AggregateRoot } from "@libs/domain";
import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";
import { State } from "./State";
import { AvailableState } from "./AvailableState";

@Entity({
  name: 'rooms'
})
export class Room extends AggregateRoot {

  @ObjectIdColumn()
  public id: ObjectId

  /**
   * 房间号
   */
  @Column()
  serialNumber: number

  @Column()
  state: State

  /**
   * 规模（人数）
   */
  @Column()
  scale: number

  constructor(serialNumber: number, scale: number) {
    super()
    this.serialNumber = serialNumber
    this.state = new AvailableState()
    this.scale = scale
  }

  reserve() {
    this.state = this.state.book()
  }

  inuse() {
    this.state = this.state.inuse()
  }

  free() {
    this.state = this.state.free()
  }
}