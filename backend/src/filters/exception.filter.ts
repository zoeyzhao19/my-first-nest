import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { Response } from "express";
import {ZodError} from 'zod'

@Catch(HttpException, ZodError)
export class HttpExceptionFilter implements ExceptionFilter {
  private logger = new Logger()

  catch(exception: HttpException | ZodError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    if(exception instanceof ZodError) {
      const error = exception.errors[0]
      this.logger.error(error.message, '', 'ZodError')
      return response.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: error.message
      }).end()
    } else {
      this.logger.error(exception.message, exception.stack)
      return response.status(exception.getStatus()).json({
        code: exception.getStatus(),
        message: exception.message
      }).end()
    }
  }
}