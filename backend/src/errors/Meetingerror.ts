import { AppError } from "./AppError";

export class MeetingError extends AppError {
  static MeetingAlreadyCancelled = '会议已被取消'
  static MeetingAlreadyFinished = '会议已结束'
  static MeetingAlreadyInProgress = '会议已开始'
  static MeetingNotInProgress = '会议未开始'
  static MeetingIssuerCannotReject = '无法拒绝自己发起的会议'
  static NotInInvitedList =  '不在邀请列表中'
  static ParticipantConflict = '与会人员 {participants} 有时间段冲突'

  constructor(message: string, ...replacers: string[]) {
    super(message, ...replacers)
  }
}