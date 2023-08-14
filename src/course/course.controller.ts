import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateCourseRequest } from './commands/createCourse/CreateCourseRequest';
import { CreateCourseCommand } from './commands/createCourse/CreateCourseCommand';
import { IMediatorService } from '@app/mediator/core/IMediatorService';

@Controller('course')
export class CourseController {

  @Inject(IMediatorService)
  private readonly  _mediator: IMediatorService;

  @Post()
  async create(@Body() body: CreateCourseRequest) {
    const command = new CreateCourseCommand(body.name, body.duration)
    await this._mediator.send(command)
  }
}
