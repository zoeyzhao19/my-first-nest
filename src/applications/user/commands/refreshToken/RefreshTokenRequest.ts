import {ApiProperty} from '@nestjs/swagger'

export class RefreshTokenRequest {
  @ApiProperty({
    description: '刷新令牌',
    type: String
  })
  refresh_token: string;
}