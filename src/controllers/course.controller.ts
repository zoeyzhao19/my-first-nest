import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateCourseRequest } from '@applications/course/commands/createCourse/CreateCourseRequest';
import { CreateCourseCommand } from '@applications/course/commands/createCourse/CreateCourseCommand';
import { IMediatorService } from '@libs/mediator';

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
