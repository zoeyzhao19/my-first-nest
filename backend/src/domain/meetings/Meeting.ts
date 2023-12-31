import { AggregateRoot } from "@libs/domain";
import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";
import { State } from "./State";
import { ScheduledState } from "./ScheduledState";
import { MeetingError } from "@errors/Meetingerror";
import { MeetingStatus } from "@shared/status";
import { InProgressState } from "./InProgressState";
import { FinishedState } from "./FinishedState";
import { CancelledState } from "./CancelledState";

@Entity({
  name: 'meetings'
})
export class Meeting extends AggregateRoot {

  @ObjectIdColumn()
  id: ObjectId;

  /**
   * 会议号
   */
  @Column()
  meetingNum: number;

  /**
   * 会议室
   */
  @Column()
  room: {
    id: string;
    name: string;
  };

  /**
   * 会议主题
   */
  @Column()
  subject: string

  /**
   * 发起人
   */
  @Column()
  issuerId: string;

  /**
   * 开始时间
   */
  @Column()
  startTime: Date;

  /**
   * 结束时间
   */
  @Column()
  endTime: Date;

  /**
   * 受邀人列表
   */
  @Column()
  participants: {
    id: string;
    name: string;
  }[];

  /**
   * 出席/签到人列表
   */
  @Column()
  presentees: {
    id: string;
    name: string;
  }[] = [];

  /**
   * 拒绝与会人列表
   */
  @Column()
  rejectors: {
    id: string;
    name: string;
  }[] = [];

  /**
   * 缺席人列表
   */
  @Column()
  absentees: {
    id: string;
    name: string;
  }[] = [];

  @Column()
  state: State

  constructor(
    meetingNum: number, 
    room: {
      id: string;
      name: string;
    }, 
    subject: string, 
    issuerId: string, 
    startTime: Date, 
    endTime: Date, 
    participants: {
      id: string;
      name: string;
    }[],
    presentees?: {
      id: string;
      name: string;
    }[],
    rejectors?: {
      id: string;
      name: string;
    }[],
    absentees?: {
      id: string;
      name: string;
    }[],
    state?: State
  ) {
    super()
    this.meetingNum = meetingNum
    this.room = room
    this.subject = subject
    this.issuerId = issuerId
    this.startTime = startTime
    this.endTime = endTime
    this.participants = participants
    this.presentees = presentees ?? []
    this.rejectors = rejectors ?? []
    this.absentees = absentees ?? []
    this.state = state ?? new ScheduledState()
  }

  progress() {
    this.state = this.state.progress()
  }

  cancel() {
    this.state = this.state.cancel()
  }

  finish() {
    this.state = this.state.finish()
  }

  updateRejectorList(rejector: {id: string; name: string}) {
    if(!this.participants.some(item => item.id === rejector.id)) {
      throw new MeetingError(MeetingError.NotInInvitedList)
    }
    if(rejector.id === this.issuerId) {
      throw new MeetingError(MeetingError.MeetingIssuerCannotReject)
    }
    if(!this.rejectors.some(item => item.id === rejector.id)) {
      this.rejectors.push(rejector)
    }
  }

  updatePresenteeList(presentee: {id: string; name: string}) {
    if(!this.participants.some(item => item.id === presentee.id)) {
      throw new MeetingError(MeetingError.NotInInvitedList)
    }
    if(!this.presentees.some(item => item.id === presentee.id)) {
      this.presentees.push(presentee)
    }
  }

  updateAbsenteeList(absentee: {id: string; name: string}) {
    if(!this.participants.some(item => item.id === absentee.id)) {
      throw new MeetingError(MeetingError.NotInInvitedList)
    }
    if(!this.absentees.some(item => item.id === absentee.id)) {
      this.absentees.push(absentee)
    }
  }

  // TODO in mappings/mapper
  // find other way to mapper
  static fromPrimitive(plainData: Record<string, any>) {
    let state: State
    switch(plainData.state.status) {
      case MeetingStatus.Scheduled:
        state = new ScheduledState()
        break;
      case MeetingStatus.InProgress:
        state = new InProgressState()
        break;
      case MeetingStatus.Finished:
        state = new FinishedState()
        break;
      case MeetingStatus.Cancelled:
        state = new CancelledState()
        break;
      default:
        throw new MeetingError(MeetingError.InvalidMeetingStatus)
    }
    const meeting = new Meeting(
      plainData.meetingNum,
      plainData.room,
      plainData.subject,
      plainData.issuerId,
      plainData.startTime,
      plainData.endTime,
      plainData.participants,
      plainData.presentees,
      plainData.rejectors,
      plainData.absentees,
      state
    )
    return meeting
  }
}