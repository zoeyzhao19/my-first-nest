import { MeetingStatus } from "@shared/status";
import { State } from "./State";
import { MeetingError } from "@errors/Meetingerror";
import { InProgressState } from "./InProgressState";
import { CancelledState } from "./CancelledState";

export class FinishedState extends State {

  constructor() {
    super(MeetingStatus.Finished)
  }

  progress(): InProgressState {
    throw new MeetingError(MeetingError.MeetingAlreadyFinished)
  }

  finish(): FinishedState {
    throw new MeetingError(MeetingError.MeetingAlreadyFinished)
  }

  cancel(): CancelledState {
    throw new MeetingError(MeetingError.MeetingAlreadyFinished)
  }

}