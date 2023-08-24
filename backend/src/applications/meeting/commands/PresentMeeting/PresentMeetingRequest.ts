import { ApiProperty } from "@nestjs/swagger";

export class PresentMeetingRequest {
  @ApiProperty({
    description: '会议号',
    type: Number
  })
  meeting_num: number;
}