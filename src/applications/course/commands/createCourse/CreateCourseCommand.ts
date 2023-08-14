import { type IRequest, ResponseFlags } from '@libs/mediator'
import type { CreateCourseResponse } from './CreateCourseResponse'

export class CreateCourseCommand implements IRequest<CreateCourseResponse> {
  name: string
  duration: string
  [ResponseFlags]?: CreateCourseResponse

  constructor(name: string, duration: string) {
    this.name = name
    this.duration = duration
  }
}
