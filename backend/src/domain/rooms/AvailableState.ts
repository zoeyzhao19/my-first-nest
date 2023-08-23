import { RoomError } from "@errors/RoomError";
import { Status } from "./Status";
import { BookedState } from "./BookedState";
import { State } from "./State";
import { InuseState } from "./InuseState";

export class AvailableState extends State {
  constructor() {
    super(Status.Available)
  }

  free(): AvailableState {
    throw new RoomError(RoomError.RoomAlreadyAvailable);
  }

  book(): BookedState {
    return new BookedState()
  }

  inuse(): InuseState {
    throw new RoomError(RoomError.ShouldBookRoomFirst);
  }

}