import { MeetingStatus } from "@shared/status";

export abstract class State {
  status: MeetingStatus;

  constructor(status: MeetingStatus) {
    this.status = status;
  }

  abstract progress(): State

  abstract finish(): State

  abstract cancel(): State

}