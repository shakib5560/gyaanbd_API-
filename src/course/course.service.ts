import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  async create(createCourseDto: CreateCourseDto, file?: Express.Multer.File) {
    const data = { ...createCourseDto };
    if (file) {
      data.thumbnail = `/public/uploads/thumbnails/${file.filename}`;
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

    const data = { ...updateCourseDto };
    if (file) {
      // Delete old thumbnail if it exists
      if (course.thumbnail && course.thumbnail.startsWith('/public/uploads/thumbnails/')) {
        const oldFilePath = join(process.cwd(), course.thumbnail);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }
      data.thumbnail = `/public/uploads/thumbnails/${file.filename}`;
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
    if (course.thumbnail && course.thumbnail.startsWith('/public/uploads/thumbnails/')) {
      const filePath = join(process.cwd(), course.thumbnail);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    return this.prisma.course.delete({
      where: { id },
    });
  }
}
