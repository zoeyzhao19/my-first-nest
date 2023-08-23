import { ApiProperty } from "@nestjs/swagger";

export class GetRoomRequest {

  @ApiProperty({
    description: '会议室名称',
    type: String,
    required: false
  })
  name: string;

  @ApiProperty({
    description: '页码',
    type: Number,
    required: false
  })
  pageNum: number;

  @ApiProperty({
    description: '每页条数',
    type: Number,
    required: false
  })
  pageSize: number;
}