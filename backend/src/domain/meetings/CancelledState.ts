import { MeetingStatus } from "@shared/status";
import { State } from "./State";
import { MeetingError } from "@errors/Meetingerror";
import { InProgressState } from "./InProgressState";
import { FinishedState } from "./FinishedState";

export class CancelledState extends State {

  constructor() {
    super(MeetingStatus.Cancelled)
  }

  progress(): InProgressState {
    throw new MeetingError(MeetingError.MeetingAlreadyCancelled)
  }

  finish(): FinishedState {
    throw new MeetingError(MeetingError.MeetingAlreadyCancelled)
  }

  cancel(): CancelledState {
    throw new MeetingError(MeetingError.MeetingAlreadyCancelled)
  }

}