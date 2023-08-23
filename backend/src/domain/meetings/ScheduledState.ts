import { MeetingStatus } from "@shared/status";
import { State } from "./State";
import { MeetingError } from "@errors/Meetingerror";
import { FinishedState } from "./FinishedState";
import { CancelledState } from "./CancelledState";
import { InProgressState } from "./InProgressState";

export class ScheduledState extends State {

  constructor() {
    super(MeetingStatus.Scheduled)
  }

  progress(): InProgressState {
    return new InProgressState();
  }

  finish(): FinishedState {
    throw new MeetingError(MeetingError.MeetingNotInProgress);
  }

  cancel(): CancelledState {
    return new CancelledState();
  }

}