import { ApiProperty } from "@nestjs/swagger";

export class CreateMeetingRequest {
  
  @ApiProperty({
    description: '开始时间',
    type: String,
  })
  startTime: string;

  @ApiProperty({
    description: '结束时间',
    type: String,
  })
  endTime: string;

  @ApiProperty({
    description: '会议室Id',
    type: String,
  })
  roomId: string;

  @ApiProperty({
    description: '会议主题',
    type: String,
  })
  subject: string;

  @ApiProperty({
    description: '与会者列表',
    type: [String],
  })
  participants: string[];
}