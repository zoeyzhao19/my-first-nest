import { MeetingStatus } from "@shared/status";
import { State } from "./State";
import { MeetingError } from "@errors/Meetingerror";
import { FinishedState } from "./FinishedState";
import { CancelledState } from "./CancelledState";

export class InProgressState extends State {

  constructor() {
    super(MeetingStatus.InProgress)
  }

  progress(): InProgressState {
    throw new MeetingError(MeetingError.MeetingAlreadyInProgress);
  }

  finish(): FinishedState {
    return new FinishedState();
  }

  cancel(): CancelledState {
    return new CancelledState();
  }

}