import { RoomError } from "@errors/RoomError";
import { Status } from "./Status";
import { AvailableState } from "./AvailableState";
import { InuseState } from "./InuseState";
import { State } from "./State";

export class BookedState extends State {
  constructor() {
    super(Status.Booked)
  }

  free(): AvailableState {
    return new AvailableState()
  }
  
  book(): BookedState {
    throw new RoomError(RoomError.RoomAlreadyBooked);
  }

  inuse(): InuseState {
    return new InuseState()
  }

}