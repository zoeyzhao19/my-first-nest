import {ApiProperty} from '@nestjs/swagger'

export class LoginRequest {
  @ApiProperty({
    description: '用户名',
    type: String
  })
  username: string;

  @ApiProperty({
    description: '密码',
    type: String
  })
  password: string;
}