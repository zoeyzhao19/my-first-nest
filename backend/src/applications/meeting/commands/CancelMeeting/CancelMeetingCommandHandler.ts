import { CommandHandler, IRequestHandler } from "@libs/mediator";
import { CancelMeetingCommand } from "./CancelMeetingCommand";
import { Inject, Injectable } from "@nestjs/common";
import { MeetingService } from "@services/meeting.service";
import { MongoEntityManager } from "typeorm";
import { InjectEntityManager } from "@nestjs/typeorm";
import { RoomService } from "@services/room.service";

@Injectable()
@CommandHandler(CancelMeetingCommand)
export class CancelMeetingCommandHandler implements IRequestHandler<CancelMeetingCommand> {

  @Inject(MeetingService)
  private meetingService: MeetingService

  @Inject(RoomService)
  private roomService: RoomService

  @InjectEntityManager()
  private entityManager: MongoEntityManager

  async handle(command: CancelMeetingCommand): Promise<void> {
    const session = this.entityManager.mongoQueryRunner.databaseConnection.startSession();

    try {
      session.startTransaction()

      const roomId = await this.meetingService.cancelMeeting(command.cancellerId, command.isAdmin, command.meetingNum, session)

      await this.roomService.releaseRoom(roomId, session)
      await session.commitTransaction()

    } catch (err) {
      await session.abortTransaction()
      throw err
    } finally {
      await session.endSession()
    }

  }
}