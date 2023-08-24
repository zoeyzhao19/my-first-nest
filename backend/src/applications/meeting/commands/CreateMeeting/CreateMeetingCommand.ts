import { IRequest, ResponseFlags } from "@libs/mediator";

export class CreateMeetingCommand implements IRequest<void> {
  [ResponseFlags]: void;

  startTime: Date;

  endTime: Date;

  roomId: string;

  subject: string;

  issuerId: string;

  participants: string[]

  constructor(startTime: Date, endTime: Date, roomId: string, subject: string, issuerId: string, participants: string[]) {
    this.startTime = startTime
    this.endTime = endTime
    this.roomId = roomId
    this.subject = subject
    this.issuerId = issuerId
    this.participants = participants
  }
}