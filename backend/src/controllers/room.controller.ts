import { GetRoomQuery } from '@applications/room/queries/GetRoomQuery';
import { GetRoomRequest } from '@applications/room/queries/GetRoomRequest';
import { MediatorService } from '@libs/mediator';
import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RequireLogin } from 'src/decorators/requre-login.decorator';

@Controller('room')
export class RoomController {

  @Inject(MediatorService)
  private _mediator: MediatorService

  @Post('list')
  @RequireLogin()
  @ApiBearerAuth()
  @HttpCode(200)
  async getList(@Body() body: GetRoomRequest) {
    const query = new GetRoomQuery(
      body.name,
      +body.page_num ?? 1,
      +body.page_size ?? 20
    )
    const result = await this._mediator.send(query)
    return result
  }

}
