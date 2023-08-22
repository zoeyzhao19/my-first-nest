import {ApiProperty} from '@nestjs/swagger'

export class GetUsersRequest {
  @ApiProperty({
    description: '用户名',
    type: String,
    required: false
  })
  username: string;

  @ApiProperty({
    description: '邮箱',
    type: String,
    required: false
  })
  email: string;

  @ApiProperty({
    description: '昵称',
    type: String,
    required: false
  })
  nickname: string;

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