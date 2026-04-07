import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto, file?: Express.Multer.File) {
    try {
      const data = { ...createCategoryDto };
      if (file) {
        data.thumbnail = `/public/uploads/thumbnails/${file.filename}`;
      }
      return await this.prisma.category.create({
        data,
      });
    } catch (error) {
      throw new ConflictException('Category already exists or something went wrong');
    }
  }

  async findAll() {
    return this.prisma.category.findMany({
      include: {
        _count: {
          select: { courses: true },
        },
      },
    });
  }

  async findOne(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: { courses: true },
    });
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto, file?: Express.Multer.File) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) throw new NotFoundException('Category not found');

    const data = { ...updateCategoryDto };
    if (file) {
      if (category.thumbnail && category.thumbnail.startsWith('/public/uploads/thumbnails/')) {
        const oldFilePath = join(process.cwd(), category.thumbnail);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }
      data.thumbnail = `/public/uploads/thumbnails/${file.filename}`;
    }

    return this.prisma.category.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) throw new NotFoundException('Category not found');

    if (category.thumbnail && category.thumbnail.startsWith('/public/uploads/thumbnails/')) {
      const filePath = join(process.cwd(), category.thumbnail);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    return this.prisma.category.delete({
      where: { id },
    });
  }
}
