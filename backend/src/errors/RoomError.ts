import { AppError } from "./AppError";

export class RoomError extends AppError {
  static RoomAlreadyAvailable = '该会议室已是空闲状态'
  static RoomNoAvailable = '会议室不可用'
  static RoomAlreadyInuse = '该会议室已是占用状态'
  static RoomAlreadyBooked = '该会议室已是预定状态'
  static ShouldBookRoomFirst = '会议室需要先预定才能使用'
  static RoomNoExisted = '会议室不存在'
  static InvalidRoomStatus = '无效的会议室状态'
  static RoomScaleNotEnough = '与会人数太多，会议室规模不足'

  constructor(message: string, ...replacers: string[]) {
    super(message, ...replacers)
  }
}