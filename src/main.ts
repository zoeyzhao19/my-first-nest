import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import {HttpExceptionFilter} from './filters/exception.filter'
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new ResponseInterceptor())
  app.useGlobalInterceptors(new LoggingInterceptor())
  await app.listen(3000);
}
bootstrap();
