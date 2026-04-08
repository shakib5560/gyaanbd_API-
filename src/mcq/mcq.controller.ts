import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { McqService } from './mcq.service';
import { CreateMcqDto } from './dto/create-mcq.dto';
import { UpdateMcqDto } from './dto/update-mcq.dto';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '../common/guard/auth.guard';
import { RolesGuard } from '../common/guard/roles.guard';
import { Roles } from '../common/decorator/roles.decorator';
import { Role } from '../common/enum/auth.enum';

@ApiTags('mcq')
@Controller('mcq')
export class McqController {
  constructor(private readonly mcqService: McqService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.TEACHER)
  @ApiOperation({ summary: 'Create a new MCQ' })
  create(@Body() createMcqDto: CreateMcqDto) {
    return this.mcqService.create(createMcqDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all MCQs' })
  findAll() {
    return this.mcqService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single MCQ by ID' })
  findOne(@Param('id') id: string) {
    return this.mcqService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.TEACHER)
  @ApiOperation({ summary: 'Update an MCQ' })
  update(@Param('id') id: string, @Body() updateMcqDto: UpdateMcqDto) {
    return this.mcqService.update(id, updateMcqDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.TEACHER)
  @ApiOperation({ summary: 'Delete an MCQ' })
  remove(@Param('id') id: string) {
    return this.mcqService.remove(id);
  }
}
