import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ImagekitService } from '../imagekit/imagekit.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService, private imagekitService: ImagekitService) {}

  async create(createCategoryDto: CreateCategoryDto, file?: Express.Multer.File) {
    try {
      const data: any = { ...createCategoryDto };
      if (file) {
        const uploadResult = await this.imagekitService.upload(file, 'gyaanbd/categories');
        data.thumbnail = uploadResult.url;
        data.thumbnailId = uploadResult.fileId;
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

    const data: any = { ...updateCategoryDto };
    if (file) {
      if (category.thumbnailId) {
        await this.imagekitService.delete(category.thumbnailId);
      }
      const uploadResult = await this.imagekitService.upload(file, 'gyaanbd/categories');
      data.thumbnail = uploadResult.url;
      data.thumbnailId = uploadResult.fileId;
    }

    return this.prisma.category.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) throw new NotFoundException('Category not found');

    if (category.thumbnailId) {
      await this.imagekitService.delete(category.thumbnailId);
    }

    return this.prisma.category.delete({
      where: { id },
    });
  }
}
