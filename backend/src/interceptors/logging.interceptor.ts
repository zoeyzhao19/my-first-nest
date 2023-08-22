import { ExecutionContext, NestInterceptor, CallHandler, Logger } from "@nestjs/common";
import {tap, Observable} from 'rxjs'
import {Request, Response} from 'express'

export class LoggingInterceptor implements NestInterceptor {
  private logger = new Logger()

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const request: Request = context.switchToHttp().getRequest();
    const response: Response = context.switchToHttp().getResponse();

    const userAgent = request.headers['user-agent']

    const {ip, method, path} = request

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => this.logger.debug(
          `${method} ${path} ${ip} ${userAgent}: [code: ${response.statusCode}]: ${Date.now() - now}ms`,
        ))
      );
  }
}