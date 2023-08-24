import { IRequest, ResponseFlags } from "@libs/mediator";

export class RejectMeetingCommand implements IRequest<void> {
  [ResponseFlags]: void;

  rejectorId: string;

  rejectorName: string;

  meetingNum: number

  constructor(rejectorId: string, rejectorName: string, meetingNum: number) {
    this.rejectorId = rejectorId
    this.rejectorName = rejectorName
    this.meetingNum = meetingNum
  }
}