import { InProgressState } from '@domain/meetings/InProgressState';
import { Meeting } from '@domain/meetings/Meeting';
import { ScheduledState } from '@domain/meetings/ScheduledState';
import { Room } from '@domain/rooms/Room';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MeetingStatus } from '@shared/status';
import { Any, ClientSession, In, MongoRepository } from 'typeorm';

interface CreateMeeting {
  issuerId: string;
  room: {
    id: string;
    name: string;
  };
  subject: string; 
  startTime: Date; 
  endTime: Date;
  participants: {
    id: string;
    name: string;
  }[];
}

@Injectable()
export class MeetingService {

  @InjectRepository(Meeting)
  private meetingRepository: MongoRepository<Meeting>;

  async create({issuerId, room, subject, startTime, endTime, participants }: CreateMeeting, session: ClientSession) {
    const meetingNum = await this.generateMeetingNum()
    const meeting = new Meeting(
      meetingNum,
      room,
      subject,
      issuerId,
      startTime,
      endTime,
      participants
    )

    await this.meetingRepository.updateOne(
      {}, 
      {$set: meeting}, 
      {upsert: true, session}
    )
  }

  async getExistedParticipantMeeting(participantIds: string[], startTime: Date, endTime: Date) {
    const meeting = await this.meetingRepository.findOne({
      where: {
        $or: [
          {
            startTime: {
              $gte: startTime,
              $lte: endTime
            }
          },
          {
            endTime: {
              $gte: startTime,
              $lte: endTime
            }
          }
        ],
        'participants.id': {
          $in: participantIds
        },
        'state.status': {
          $in: [MeetingStatus.Scheduled, MeetingStatus.InProgress]
        }
      }
    })

    return meeting
  }

  private async generateMeetingNum() {
    let meetingNum: undefined | number
    while(true) {
      meetingNum = +(Math.random().toString().slice(2, 8))
      const meeting = await this.meetingRepository.findOne({
        where: {
          meetingNum
        }
      })
      if(!meeting) {
        break;
      }
    }

    return meetingNum

  }
}
