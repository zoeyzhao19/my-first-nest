import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MediatorModule } from '@libs/mediator';
import { CourseModule } from './modules/course.module';
import { CourseController } from './controllers/course.controller';
import { CourseService } from './services/course.service';

@Module({
  imports: [MediatorModule, CourseModule],
  controllers: [AppController, CourseController],
  providers: [AppService, CourseService],
})
export class AppModule {}
