import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class LessonService {
  constructor(private prisma: PrismaService) {}

  async create(createLessonDto: CreateLessonDto, file?: Express.Multer.File) {
    const data = { ...createLessonDto };
    if (file) {
      data.videoUrl = `/public/uploads/lessons/${file.filename}`;
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

  async findOne(id: string) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id },
      include: { module: true },
    });
    if (!lesson) throw new NotFoundException('Lesson not found');
    return lesson;
  }

  async update(id: string, updateLessonDto: UpdateLessonDto, file?: Express.Multer.File) {
    const lesson = await this.prisma.lesson.findUnique({ where: { id } });
    if (!lesson) throw new NotFoundException('Lesson not found');

    const data = { ...updateLessonDto };
    if (file) {
      if (lesson.videoUrl && lesson.videoUrl.startsWith('/public/uploads/lessons/')) {
        const oldFilePath = join(process.cwd(), lesson.videoUrl);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }
      data.videoUrl = `/public/uploads/lessons/${file.filename}`;
    }

    return this.prisma.lesson.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    const lesson = await this.prisma.lesson.findUnique({ where: { id } });
    if (!lesson) throw new NotFoundException('Lesson not found');

    if (lesson.videoUrl && lesson.videoUrl.startsWith('/public/uploads/lessons/')) {
      const filePath = join(process.cwd(), lesson.videoUrl);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    return this.prisma.lesson.delete({
      where: { id },
    });
  }
}
