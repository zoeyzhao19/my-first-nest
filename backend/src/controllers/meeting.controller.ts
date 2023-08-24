import { CancelMeetingCommand } from '@applications/meeting/commands/CancelMeeting/CancelMeetingCommand';
import { CancelMeetingRequest } from '@applications/meeting/commands/CancelMeeting/CancelMeetingRequest';
import { CreateMeetingCommand } from '@applications/meeting/commands/CreateMeeting/CreateMeetingCommand';
import { CreateMeetingRequest } from '@applications/meeting/commands/CreateMeeting/CreateMeetingRequest';
import { PresentMeetingCommand } from '@applications/meeting/commands/PresentMeeting/PresentMeetingCommand';
import { PresentMeetingRequest } from '@applications/meeting/commands/PresentMeeting/PresentMeetingRequest';
import { RejectMeetingCommand } from '@applications/meeting/commands/RejectMeeting/RejectMeetingCommand';
import { RejectMeetingRequest } from '@applications/meeting/commands/RejectMeeting/RejectMeetingRequest';
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
      new Date(body.start_time),
      new Date(body.end_time),
      body.room_id,
      body.subject,
      userId,
      body.participants
    )

    await this._mediator.send(command)
  }

  @Post('/cancel')
  @HttpCode(200)
  @ApiBearerAuth()
  @RequireLogin()
  async cancel(@UserInfo() userInfo: Request['user'], @Body() body: CancelMeetingRequest) {
    const command = new CancelMeetingCommand(userInfo.id, +body.meeting_num)

    await this._mediator.send(command)
  }

  @Post('/reject')
  @HttpCode(200)
  @ApiBearerAuth()
  @RequireLogin()
  async reject(@UserInfo() userInfo: Request['user'], @Body() body: RejectMeetingRequest) {
    const command = new RejectMeetingCommand(userInfo.id, userInfo.username, +body.meeting_num)

    await this._mediator.send(command)
  }

  @Post('/present')
  @HttpCode(200)
  @ApiBearerAuth()
  @RequireLogin()
  async present(@UserInfo() userInfo: Request['user'], @Body() body: PresentMeetingRequest) {
    const command = new PresentMeetingCommand(userInfo.id, userInfo.username, +body.meeting_num)

    await this._mediator.send(command)
  }
}
