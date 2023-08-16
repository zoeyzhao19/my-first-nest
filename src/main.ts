import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import {HttpExceptionFilter} from './filters/exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter())
  await app.listen(3000);
}
bootstrap();
