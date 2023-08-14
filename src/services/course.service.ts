import { Injectable } from '@nestjs/common';

@Injectable()
export class CourseService {
  createCourse(name: string, duration: string): Promise<void> {
    return Promise.resolve()
  }
}
