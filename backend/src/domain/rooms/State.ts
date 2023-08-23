import { AvailableState } from "./AvailableState"
import { InuseState } from "./InuseState"
import { BookedState } from "./BookedState"
import { RoomStatus } from "@shared/status"

export abstract class State {
  status: RoomStatus
  constructor(status: RoomStatus) { 
    this.status = status
  }

  abstract release(): AvailableState

  abstract book(): BookedState

  abstract use(): InuseState

}