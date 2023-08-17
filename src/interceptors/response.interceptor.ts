import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Response } from "express";
import {map} from 'rxjs'

export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    const response: Response = context.switchToHttp().getResponse()

    return next.handle().pipe(map(data => {
      return {
        code: response.statusCode,
        data: data
      }
    }))
  }
}