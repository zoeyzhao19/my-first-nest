import { CreateMeetingCommand } from '@applications/meeting/commands/CreateMeetingCommand';
import { CreateMeetingRequest } from '@applications/meeting/commands/CreateMeetingRequest';
import { MediatorService } from '@libs/mediator';
import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import { RequireLogin, UserInfo } from 'src/decorators/requre-login.decorator';

@Controller('meeting')
export class MeetingController {

  @Inject(MediatorService)
  private _mediator: MediatorService;

  @Post('/create')
  @HttpCode(200)
  @ApiBearerAuth()
  @RequireLogin()
  async create(@UserInfo() userInfo: Request['user'], @Body() body: CreateMeetingRequest) {
    const userId = userInfo.id
    const command = new CreateMeetingCommand(
      new Date(body.startTime),
      new Date(body.endTime),
      body.roomId,
      body.subject,
      userId,
      body.participants
    )

    await this._mediator.send(command)
  }
}
