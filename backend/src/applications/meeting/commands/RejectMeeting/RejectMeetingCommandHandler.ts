import { MediatorHandler, IRequestHandler } from "@libs/mediator";
import { RejectMeetingCommand } from "./RejectMeetingCommand";
import { Inject, Injectable } from "@nestjs/common";
import { MeetingService } from "@services/meeting.service";

@Injectable()
@MediatorHandler(RejectMeetingCommand)
export class RejectMeetingCommandHandler implements IRequestHandler<RejectMeetingCommand> {

  @Inject(MeetingService)
  private meetingService: MeetingService

  async handle(command: RejectMeetingCommand): Promise<void> {
    await this.meetingService.rejectMeeting(command.rejectorId, command.rejectorName, command.meetingNum)
  }
}