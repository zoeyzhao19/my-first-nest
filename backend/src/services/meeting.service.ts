import { InProgressState } from '@domain/meetings/InProgressState';
import { Meeting } from '@domain/meetings/Meeting';
import { ScheduledState } from '@domain/meetings/ScheduledState';
import { Room } from '@domain/rooms/Room';
import { MeetingError } from '@errors/Meetingerror';
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

  async cancelMeeting(canceller: string,  meetingNum: number, session: ClientSession) {
    let meeting = await this.meetingRepository.findOne({
      where: {
        meetingNum: +meetingNum
      }
    })

    if(!meeting) {
      throw new MeetingError(MeetingError.MeetingNoFound)
    }

    if(meeting.issuerId !== canceller) {
      throw new MeetingError(MeetingError.MeetingCancelLimited)
    }

    if(meeting.startTime < new Date()) {
      throw new MeetingError(MeetingError.MeetingAlreadyBegin)
    }

    meeting = Meeting.fromPrimitive(meeting)

    meeting.cancel()

    await this.meetingRepository.updateOne({
      meetingNum: +meetingNum
    }, {$set: meeting}, {session})

    return meeting.room.id
  }

  async rejectMeeting(rejectorId: string, rejectorName: string, meetingNum: number) {
    let meeting = await this.meetingRepository.findOne({
      where: {
        meetingNum: meetingNum
      }
    })

    if(!meeting) {
      throw new MeetingError(MeetingError.MeetingNoFound)
    }

    meeting = Meeting.fromPrimitive(meeting)

    if(!meeting.participants.some(participant => participant.id === rejectorId)) {
      throw new MeetingError(MeetingError.NotInInvitedList)
    } 
    
    if(meeting.issuerId === rejectorId) {
      throw new MeetingError(MeetingError.MeetingIssuerCannotReject)
    }
    
    if(meeting.state.status !== MeetingStatus.Scheduled) {
      throw new MeetingError(MeetingError.CanRejectScheduledMeetingOnly)
    }

    if(!meeting.rejectors.some(rejector => rejector.id === rejectorId)) {
      meeting.updateRejectorList({
        id: rejectorId,
        name: rejectorName
      })
    }


    await this.meetingRepository.updateOne({
      meetingNum: meetingNum
    }, {$set: meeting})

    return meeting.room.id
  }

  async presentMeeting(presenteeId: string, presenteeName: string, meetingNum: number) {
    const meeting = await this.meetingRepository.findOne({
      where: {
        meetingNum: meetingNum
      }
    })

    if(!meeting) {
      throw new MeetingError(MeetingError.MeetingNoFound)
    }

    if(!meeting.participants.some(participant => participant.id === presenteeId)) {
      throw new MeetingError(MeetingError.NotInInvitedList)
    }

    if(meeting.state.status === MeetingStatus.Finished) {
      throw new MeetingError(MeetingError.MeetingAlreadyFinished)
    }

    if(meeting.state.status === MeetingStatus.Cancelled) {
      throw new MeetingError(MeetingError.MeetingAlreadyCancelled)
    }

    

    if(!meeting.presentees.some(presentee => presentee.id === presenteeId)) {
      meeting.updatePresenteeList({
        id: presenteeId,
        name: presenteeName
      })
    }

    await this.meetingRepository.updateOne({
      meetingNum: meetingNum
    }, {$set: meeting})
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
