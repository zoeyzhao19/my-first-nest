import {HttpException, HttpStatus} from '@nestjs/common'

export class AppError extends HttpException {
  constructor(message: string, ...replacers: string[]) {
    for (const replacer of replacers)
      message = message.replace(/\{.*?\}/, replacer)
    super(message, HttpStatus.BAD_REQUEST)
    this.name = this.constructor.name
  }
}
