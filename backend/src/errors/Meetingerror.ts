import { AppError } from "./AppError";

export class MeetingError extends AppError {
  static MeetingAlreadyCancelled = '会议已被取消'
  static MeetingAlreadyFinished = '会议已结束'
  static MeetingNotBeginYet = '会议未开始'
  static MeetingAlreadyInProgress = '会议已开始'
  static MeetingNotInProgress = '会议未开始'
  static MeetingIssuerCannotReject = '无法拒绝自己发起的会议'
  static NotInInvitedList =  '不在邀请列表中'
  static ParticipantConflict = '与会人员 {participants} 有时间段冲突'
  static MeetingNoFound = '找不到相关会议'
  static MeetingCancelLimited = '只有管理员或会议发起者可以取消会议'
  static InvalidMeetingStatus = '无效的会议状态'
  static MeetingAlreadyBegin = '会议已开始'
  static CanRejectScheduledMeetingOnly = '只能拒绝未开始的会议'

  constructor(message: string, ...replacers: string[]) {
    super(message, ...replacers)
  }
}