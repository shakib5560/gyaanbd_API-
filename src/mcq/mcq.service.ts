import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMcqDto } from './dto/create-mcq.dto';
import { UpdateMcqDto } from './dto/update-mcq.dto';

@Injectable()
export class McqService {
  constructor(private prisma: PrismaService) {}

  async create(createMcqDto: CreateMcqDto) {
    return this.prisma.mCQ.create({
      data: createMcqDto,
    });
  }

  async findAll() {
    return this.prisma.mCQ.findMany({
      include: {
        course: { select: { title: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const mcq = await this.prisma.mCQ.findUnique({
      where: { id },
      include: { course: true, teacher: true },
    });
    if (!mcq) throw new NotFoundException(`MCQ with ID ${id} not found`);
    return mcq;
  }

  async update(id: string, updateMcqDto: UpdateMcqDto) {
    const mcq = await this.prisma.mCQ.findUnique({ where: { id } });
    if (!mcq) throw new NotFoundException(`MCQ with ID ${id} not found`);

    return this.prisma.mCQ.update({
      where: { id },
      data: updateMcqDto,
    });
  }

  async remove(id: string) {
    const mcq = await this.prisma.mCQ.findUnique({ where: { id } });
    if (!mcq) throw new NotFoundException(`MCQ with ID ${id} not found`);

    return this.prisma.mCQ.delete({ where: { id } });
  }
}
