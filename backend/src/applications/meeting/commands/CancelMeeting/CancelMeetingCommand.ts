import { IRequest, ResponseFlags } from "@libs/mediator";

export class CancelMeetingCommand implements IRequest<void> {
  [ResponseFlags]: void;

  cancellerId: string;

  isAdmin: boolean;

  meetingNum: number

  constructor(cancellerId: string, isAdmin: boolean, meetingNum: number) {
    this.cancellerId = cancellerId
    this.isAdmin = isAdmin
    this.meetingNum = meetingNum
  }
}