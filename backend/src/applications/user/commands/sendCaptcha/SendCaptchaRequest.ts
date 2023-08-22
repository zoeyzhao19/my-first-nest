import {ApiProperty} from '@nestjs/swagger'

export class SendCaptchaRequest {
    @ApiProperty({
        description: '邮箱',
        type: String
      })
    email: string;
}