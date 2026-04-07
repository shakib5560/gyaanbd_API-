import { Injectable } from '@nestjs/common';
import { CreateMcqDto } from './dto/create-mcq.dto';
import { UpdateMcqDto } from './dto/update-mcq.dto';

@Injectable()
export class McqService {
  create(createMcqDto: CreateMcqDto) {
    return 'This action adds a new mcq';
  }

  findAll() {
    return `This action returns all mcq`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mcq`;
  }

  update(id: number, updateMcqDto: UpdateMcqDto) {
    return `This action updates a #${id} mcq`;
  }

  remove(id: number) {
    return `This action removes a #${id} mcq`;
  }
}
