import type { IRequestHandler } from '@app/mediator'
import { registerHandler } from '@app/mediator'
import { CreateCourseCommand } from './CreateCourseCommand'
import type { CreateCourseResponse } from './CreateCourseResponse'
import { CourseService } from '../../course.service'
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
