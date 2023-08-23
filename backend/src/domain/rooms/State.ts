import { AvailableState } from "./AvailableState"
import { InuseState } from "./InuseState"
import { BookedState } from "./BookedState"
import { Status } from "./Status"

export abstract class State {
  status: Status
  constructor(status: Status) { 
    this.status = status
  }

  abstract free(): AvailableState

  abstract book(): BookedState

  abstract inuse(): InuseState

}