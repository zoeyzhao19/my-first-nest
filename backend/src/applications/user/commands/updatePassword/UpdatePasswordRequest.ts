import {ApiProperty} from '@nestjs/swagger'

export class UpdatePassRequest {
  @ApiProperty({
    description: '旧密码',
    type: String
  })
  old_password: string

  @ApiProperty({
    description: '新密码',
    type: String
  })
  new_password: string

  @ApiProperty({
    description: '验证码',
    type: Number
  })
  captcha: number
}