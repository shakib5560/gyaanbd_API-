import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';

@Injectable()
export class ModuleService {
  constructor(private prisma: PrismaService) {}

  async create(createModuleDto: CreateModuleDto) {
    return this.prisma.module.create({
      data: createModuleDto,
    });
  }

  async findAll() {
    return this.prisma.module.findMany({
      include: {
        lessons: true,
        course: { select: { title: true } },
      },
      orderBy: { order: 'asc' },
    });
  }

  async findOne(id: string) {
    const module = await this.prisma.module.findUnique({
      where: { id },
      include: { lessons: true, course: true },
    });
    if (!module) throw new NotFoundException('Module not found');
    return module;
  }

  async update(id: string, updateModuleDto: UpdateModuleDto) {
    const module = await this.prisma.module.findUnique({ where: { id } });
    if (!module) throw new NotFoundException('Module not found');

    return this.prisma.module.update({
      where: { id },
      data: updateModuleDto,
    });
  }

  async remove(id: string) {
    const module = await this.prisma.module.findUnique({ where: { id } });
    if (!module) throw new NotFoundException('Module not found');

    return this.prisma.module.delete({
      where: { id },
    });
  }
}
