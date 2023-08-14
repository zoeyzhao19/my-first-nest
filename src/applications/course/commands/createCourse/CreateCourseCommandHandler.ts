import type { IRequestHandler } from '@libs/mediator'
import { registerHandler } from '@libs/mediator'
import { CreateCourseCommand } from './CreateCourseCommand'
import type { CreateCourseResponse } from './CreateCourseResponse'
import { CourseService } from '@services/course.service'
import { Injectable } from '@nestjs/common'

@registerHandler(CreateCourseCommand)
@Injectable()
export class CreateCourseCommandHandler implements IRequestHandler<CreateCourseCommand, CreateCourseResponse> {
  constructor(private readonly _courseService: CourseService) {
  }

  async handle(command: CreateCourseCommand) {
    return await this._courseService.createCourse(command.name, command.duration)
  }
}
