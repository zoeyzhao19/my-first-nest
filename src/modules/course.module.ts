import { Module } from '@nestjs/common';
import { CourseController } from '../controllers/course.controller';
import { CourseService } from '../services/course.service';
import { CreateCourseCommandHandler } from '@applications/course/commands/createCourse/CreateCourseCommandHandler';
import { CreateCourseValidation } from '@applications/course/commands/createCourse/CreateCourseValidation';

@Module({
  controllers: [CourseController],
  providers: [CourseService, CreateCourseCommandHandler, CreateCourseValidation]
})
export class CourseModule {}
