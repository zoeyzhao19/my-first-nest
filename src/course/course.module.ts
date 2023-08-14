import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { CreateCourseCommandHandler } from './commands/createCourse/CreateCourseCommandHandler';
import { CreateCourseValidation } from './commands/createCourse/CreateCourseValidation';

@Module({
  controllers: [CourseController],
  providers: [CourseService, CreateCourseCommandHandler, CreateCourseValidation]
})
export class CourseModule {}
