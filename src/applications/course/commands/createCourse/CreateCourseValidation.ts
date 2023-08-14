import type { IPipeBehavior } from '@libs/mediator'
import { registerPipeline } from '@libs/mediator'
import Joi from 'joi'
import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateCourseCommand } from './CreateCourseCommand'

@Injectable()
@registerPipeline(CreateCourseCommand)
export class CreateCourseValidation implements IPipeBehavior<CreateCourseCommand> {
  handle(command: CreateCourseCommand, next: () => void) {
    const schema = Joi.object<CreateCourseCommand>({
      name: Joi.string().required(),
      duration: Joi.string().required()
    })
    const result = schema.validate(command)
    if (result.error)
      throw new BadRequestException(result.error.message)

    next()
  }
}
