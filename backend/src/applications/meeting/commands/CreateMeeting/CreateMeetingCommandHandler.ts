import { CommandHandler, IRequestHandler } from "@libs/mediator";
import { CreateMeetingCommand } from "./CreateMeetingCommand";
import { MeetingService } from "@services/meeting.service";
import { Inject, Injectable } from "@nestjs/common";
import { RoomService } from "@services/room.service";
import { RoomError } from "@errors/RoomError";
import { RoomStatus } from "@shared/status";
import { InjectEntityManager } from "@nestjs/typeorm";
import { MongoEntityManager } from "typeorm";
import { UserService } from "@services/user.service";
import { Meeting } from "@domain/meetings/Meeting";
import { MeetingError } from "@errors/Meetingerror";

@Injectable()
@CommandHandler(CreateMeetingCommand)
export class CreateMeetingCommandHandler implements IRequestHandler<CreateMeetingCommand> {

  @Inject(MeetingService)
  private meetingService: MeetingService

  @InjectEntityManager()
  private entityManager: MongoEntityManager

  @Inject(RoomService)
  private roomService: RoomService

  @Inject(UserService)
  private userService: UserService

  async handle(command: CreateMeetingCommand) {
    const session = this.entityManager.mongoQueryRunner.databaseConnection.startSession();

    try {
      session.startTransaction()

      // 检查是否可用
      const room = await this.roomService.bookRoom(command.roomId, session)
      if(room.scale < command.participants.length) {
        throw new RoomError(RoomError.RoomScaleNotEnough)
      }

      // 检查时间段是否有冲突
      const participantMeeting = await this.meetingService.getExistedParticipantMeeting(command.participants, command.startTime, command.endTime)
      if(participantMeeting) {
        throw new MeetingError(MeetingError.ParticipantConflict, participantMeeting.participants.map(item => item.name).join(', '))
      }

      const users = await this.userService.findUserByIds(command.participants)

      await this.meetingService.create(
        {
          issuerId: command.issuerId,
          room: {
            id: command.roomId,
            name: room.name
          },
          subject: command.subject,
          startTime: command.startTime,
          endTime: command.endTime,
          participants: users.map(user => {
            return {
              id: user.id.toString(),
              name: user.username.value
            }
          })
        },
        session
      )
      await session.commitTransaction()
    } catch (err) {
      await session.abortTransaction()
      throw err
    } finally {
      await session.endSession()
    }
  }
}