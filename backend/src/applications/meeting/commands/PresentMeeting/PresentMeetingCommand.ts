import { IRequest, ResponseFlags } from "@libs/mediator";

export class PresentMeetingCommand implements IRequest<void> {
  [ResponseFlags]: void;

  presenteeId: string;

  presenteeName: string;

  meetingNum: number

  constructor(presenteeId: string, presenteeName: string, meetingNum: number) {
    this.presenteeId = presenteeId
    this.presenteeName = presenteeName
    this.meetingNum = meetingNum
  }
}