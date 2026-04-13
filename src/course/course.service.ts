import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ImagekitService } from '../imagekit/imagekit.service';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService, private imagekitService: ImagekitService) {}

  async create(createCourseDto: CreateCourseDto, file?: Express.Multer.File) {
    const data: any = { ...createCourseDto };
    if (file) {
      const uploadResult = await this.imagekitService.upload(file, 'gyaanbd/courses');
      data.thumbnail = uploadResult.url;
      data.thumbnailId = uploadResult.fileId;
    }

    return this.prisma.course.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.course.findMany({
      include: {
        teacher: {
          include: {
            user: { select: { username: true, email: true } },
          },
        },
        category: true,
      },
    });
  }

  async findOne(id: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: {
        teacher: true,
        category: true,
        modules: {
          include: { lessons: true },
        },
      },
    });
    if (!course) throw new NotFoundException('Course not found');
    return course;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto, file?: Express.Multer.File) {
    const course = await this.prisma.course.findUnique({ where: { id } });
    if (!course) throw new NotFoundException('Course not found');

    const data: any = { ...updateCourseDto };
    if (file) {
      // Delete old thumbnail if it exists
      if (course.thumbnailId) {
        await this.imagekitService.delete(course.thumbnailId);
      }
      const uploadResult = await this.imagekitService.upload(file, 'gyaanbd/courses');
      data.thumbnail = uploadResult.url;
      data.thumbnailId = uploadResult.fileId;
    }

    return this.prisma.course.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    const course = await this.prisma.course.findUnique({ where: { id } });
    if (!course) throw new NotFoundException('Course not found');

    // Delete thumbnail if it exists
    if (course.thumbnailId) {
      await this.imagekitService.delete(course.thumbnailId);
    }

    return this.prisma.course.delete({
      where: { id },
    });
  }
}
