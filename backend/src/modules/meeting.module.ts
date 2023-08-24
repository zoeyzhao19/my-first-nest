import { Meeting } from '@domain/meetings/Meeting';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeetingService } from '@services/meeting.service';
import { MeetingController } from '../controllers/meeting.controller';
import { CreateMeetingCommandHandler } from '@applications/meeting/commands/CreateMeeting/CreateMeetingCommandHandler';
import { RoomModule } from './room.module';
import { UserModule } from './user.module';
import { CancelMeetingCommandHandler } from '@applications/meeting/commands/CancelMeeting/CancelMeetingCommandHandler';
import { RejectMeetingCommandHandler } from '@applications/meeting/commands/RejectMeeting/RejectMeetingCommandHandler';
import { PresentMeetingCommandHandler } from '@applications/meeting/commands/PresentMeeting/PresentMeetingCommandHandler';

@Module({
  imports: [
    TypeOrmModule.forFeature([Meeting]),

    RoomModule,
    UserModule
  ],
  controllers: [
    MeetingController
  ],
  providers: [
    MeetingService,

    CreateMeetingCommandHandler,
    CancelMeetingCommandHandler,
    RejectMeetingCommandHandler,
    PresentMeetingCommandHandler
  ]
})
export class MeetingModule {}
