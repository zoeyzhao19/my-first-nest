import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MediatorModule } from '@app/mediator';
import { CourseModule } from './course/course.module';

@Module({
  imports: [MediatorModule, CourseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
