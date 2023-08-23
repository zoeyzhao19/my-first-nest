export const enum RoomStatus {
  /**
   * 空闲
   */
  Available = 'available',
  /**
   * 占用中
   */
  Inuse = 'inuse',
  /**
   * 已预定
   */
  Booked = 'booked',
}


export const enum MeetingStatus {
  /**
   * 未开始
   */
  Scheduled = 'scheduled',

  /**
   * 进行中
   */
  InProgress = 'inProgress',

  /**
   * 已结束
   */
  Finished = 'finished',

  /**
   * 已取消
   */
  Cancelled = 'cancelled',
}