import { MediatorService } from '@app/mediator';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateCourseRequest } from './commands/createCourse/CreateCourseRequest';
import { CreateCourseCommand } from './commands/createCourse/CreateCourseCommand';

@Controller('course')
export class CourseController {

  constructor(private readonly _mediator: MediatorService) {
  }

  @Post()
  async create(@Body() body: CreateCourseRequest) {
    const command = new CreateCourseCommand(body.name, body.duration)
    await this._mediator.send(command)
  }
}
