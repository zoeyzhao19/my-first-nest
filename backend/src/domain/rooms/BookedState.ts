import { RoomError } from "@errors/RoomError";
import { RoomStatus } from "@shared/status";
import { AvailableState } from "./AvailableState";
import { InuseState } from "./InuseState";
import { State } from "./State";

export class BookedState extends State {
  constructor() {
    super(RoomStatus.Booked)
  }

  release(): AvailableState {
    return new AvailableState()
  }
  
  book(): BookedState {
    throw new RoomError(RoomError.RoomAlreadyBooked);
  }

  use(): InuseState {
    return new InuseState()
  }

}