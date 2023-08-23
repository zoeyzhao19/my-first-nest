import { Meeting } from '@domain/meetings/Meeting';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeetingService } from '@services/meeting.service';
import { MeetingController } from '../controllers/meeting.controller';
import { CreateMeetingCommandHandler } from '@applications/meeting/commands/CreateMeetingCommandHandler';
import { RoomModule } from './room.module';
import { UserModule } from './user.module';

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

    CreateMeetingCommandHandler
  ]
})
export class MeetingModule {}
