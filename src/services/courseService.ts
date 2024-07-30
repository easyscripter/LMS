import { db } from '@/lib/db';
import { Course } from '@prisma/client';

class CourseService {
  async getCourses() {
    const courses = await db.course.findMany();
    return courses;
  }

  async getCourse(id: number) {
    const course = await db.course.findUnique({
      where: {
        id,
      },
      include: {
        modules: true,
        assignments: true,
        enrollments: true,
      },
    });
    return course;
  }

  async getCourseByUserId(userId: string) {
    const course = await db.course.findMany({
      where: {
        instructorId: userId,
      },
      include: {
        modules: true,
        assignments: true,
        enrollments: true,
      },
    });
    return course;
  }

  async createCourse(data: Course) {
    const course = await db.course.create({
      data,
    });
    return course;
  }

  async updateCourse(id: number, data: Course) {
    const course = await db.course.update({
      where: {
        id,
      },
      data,
    });
    return course;
  }

  async deleteCourse(id: number) {
    const course = await db.course.delete({
      where: {
        id,
      },
    });
    return course;
  }
}
