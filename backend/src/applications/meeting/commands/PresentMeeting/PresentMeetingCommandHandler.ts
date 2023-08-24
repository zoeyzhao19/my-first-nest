import { CommandHandler, IRequestHandler } from "@libs/mediator";
import { PresentMeetingCommand } from "./PresentMeetingCommand";
import { Inject, Injectable } from "@nestjs/common";
import { MeetingService } from "@services/meeting.service";

@Injectable()
@CommandHandler(PresentMeetingCommand)
export class PresentMeetingCommandHandler implements IRequestHandler<PresentMeetingCommand> {

  @Inject(MeetingService)
  private meetingService: MeetingService

  async handle(command: PresentMeetingCommand): Promise<void> {
    await this.meetingService.presentMeeting(command.presenteeId, command.presenteeName, command.meetingNum)
  }
}