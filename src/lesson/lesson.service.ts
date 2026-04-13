import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Role, PaymentStatus } from '@prisma/client';
import { ImagekitService } from '../imagekit/imagekit.service';

@Injectable()
export class LessonService {
  constructor(private prisma: PrismaService, private imagekitService: ImagekitService) {}

  async create(createLessonDto: CreateLessonDto, file?: Express.Multer.File) {
    const data: any = { ...createLessonDto };
    if (file) {
      const uploadResult = await this.imagekitService.upload(file, 'gyaanbd/lessons');
      data.videoUrl = uploadResult.url;
      data.videoId = uploadResult.fileId;
    }
    return this.prisma.lesson.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.lesson.findMany({
      include: {
        module: { select: { title: true, course: { select: { title: true } } } },
      },
      orderBy: { order: 'asc' },
    });
  }

  async findOne(id: string, userId?: string, role?: string) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id },
      include: { 
        module: {
          include: {
            course: true
          }
        } 
      },
    });

    if (!lesson) throw new NotFoundException('Lesson not found');

    // If no user context (shouldn't happen with guards but for safety), restrict access
    if (!userId || !role) {
        throw new ForbiddenException('Authentication required to access lessons.');
    }

    const course = lesson.module.course;

    // 1. ADMIN bypass
    if (role === Role.ADMIN) return lesson;

    // 2. TEACHER check
    if (role === Role.TEACHER) {
      const teacher = await this.prisma.teacherProfile.findUnique({
        where: { userId }
      });
      if (teacher && teacher.id === course.teacherId) {
        return lesson;
      }
      throw new ForbiddenException('Only the course creator or admins can access this course content.');
    }

    // 3. STUDENT check
    if (role === Role.STUDENT) {
      // Check for approved payment
      const payment = await this.prisma.payment.findFirst({
        where: {
          userId,
          courseId: course.id,
          status: PaymentStatus.APPROVED
        }
      });

      if (payment) return lesson;

      // Special case for free courses if applicable
      if (course.isFree) {
          const student = await this.prisma.studentProfile.findUnique({ where: { userId } });
          if (student) {
              const enrollment = await this.prisma.courseEnrollment.findUnique({
                  where: {
                      courseId_studentId: {
                          courseId: course.id,
                          studentId: student.id
                      }
                  }
              });
              if (enrollment) return lesson;
          }
      }

      throw new ForbiddenException('You must purchase this course to access the lesson.');
    }

    throw new ForbiddenException('Access denied.');
  }

  async update(id: string, updateLessonDto: UpdateLessonDto, file?: Express.Multer.File) {
    const lesson = await this.prisma.lesson.findUnique({ where: { id } });
    if (!lesson) throw new NotFoundException('Lesson not found');

    const data: any = { ...updateLessonDto };
    if (file) {
      if (lesson.videoId) {
        await this.imagekitService.delete(lesson.videoId);
      }
      const uploadResult = await this.imagekitService.upload(file, 'gyaanbd/lessons');
      data.videoUrl = uploadResult.url;
      data.videoId = uploadResult.fileId;
    }

    return this.prisma.lesson.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    const lesson = await this.prisma.lesson.findUnique({ where: { id } });
    if (!lesson) throw new NotFoundException('Lesson not found');

    if (lesson.videoId) {
      await this.imagekitService.delete(lesson.videoId);
    }

    return this.prisma.lesson.delete({
      where: { id },
    });
  }
}
