import {ApiProperty} from '@nestjs/swagger'

export class RegisterRequest {
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

  @ApiProperty({
    description: '邮箱',
    type: String
  })
  email: string;

  @ApiProperty({
    description: '昵称',
    type: String
  })
  nickname:string;

  @ApiProperty({
    description: '验证码',
    type: Number
  })
  captcha: number;
}