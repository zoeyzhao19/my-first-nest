import { Module } from '@nestjs/common';
// import { CourseController } from '../controllers/course.controller';
// import { CourseService } from '../services/course.service';
// import { CreateCourseCommandHandler } from '@applications/course/commands/createCourse/CreateCourseCommandHandler';
// import { CreateCourseValidation } from '@applications/course/commands/createCourse/CreateCourseValidation';
import { UserModule } from './user.module';

@Module({
  // controllers: [CourseController],
  // providers: [CourseService, CreateCourseCommandHandler, CreateCourseValidation],
  imports: [UserModule]
})
export class IndexModule {}
