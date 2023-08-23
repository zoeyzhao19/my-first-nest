import { RoomError } from "@errors/RoomError";
import { Status } from "./Status";
import { AvailableState } from "./AvailableState";
import { State } from "./State";
import { BookedState } from "./BookedState";

export class InuseState extends State {
  constructor() {
    super(Status.Inuse)
  }

  free(): AvailableState {
    return new AvailableState()
  }
  
  book(): BookedState {
    throw new RoomError(RoomError.RoomAlreadyInuse)
  }

  inuse(): InuseState {
    throw new RoomError(RoomError.RoomAlreadyInuse)
  }

}