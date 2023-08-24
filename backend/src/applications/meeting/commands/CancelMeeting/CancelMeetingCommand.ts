import { IRequest, ResponseFlags } from "@libs/mediator";

export class CancelMeetingCommand implements IRequest<void> {
  [ResponseFlags]: void;

  cancellerId: string;

  meetingNum: number

  constructor(cancellerId: string, meetingNum: number) {
    this.cancellerId = cancellerId
    this.meetingNum = meetingNum
  }
}