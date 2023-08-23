import { RoomError } from "@errors/RoomError";
import { RoomStatus } from "@shared/status";
import { AvailableState } from "./AvailableState";
import { State } from "./State";
import { BookedState } from "./BookedState";

export class InuseState extends State {
  constructor() {
    super(RoomStatus.Inuse)
  }

  release(): AvailableState {
    return new AvailableState()
  }
  
  book(): BookedState {
    throw new RoomError(RoomError.RoomAlreadyInuse)
  }

  use(): InuseState {
    throw new RoomError(RoomError.RoomAlreadyInuse)
  }

}