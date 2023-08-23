import { RoomError } from "@errors/RoomError";
import { RoomStatus } from "@shared/status";
import { BookedState } from "./BookedState";
import { State } from "./State";
import { InuseState } from "./InuseState";

export class AvailableState extends State {
  constructor() {
    super(RoomStatus.Available)
  }

  release(): AvailableState {
    throw new RoomError(RoomError.RoomAlreadyAvailable);
  }

  book(): BookedState {
    return new BookedState()
  }

  use(): InuseState {
    throw new RoomError(RoomError.ShouldBookRoomFirst);
  }

}