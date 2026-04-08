import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, Req } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { ApiTags, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { AuthGuard } from '../common/guard/auth.guard';
import { RolesGuard } from '../common/guard/roles.guard';
import { Roles } from '../common/decorator/roles.decorator';
import { Role } from '../common/enum/auth.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('lessons')
@Controller('lessons')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.TEACHER)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('video', {
    storage: diskStorage({
      destination: './public/uploads/lessons',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `lesson-${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
  }))
  create(@Body() createLessonDto: CreateLessonDto, @UploadedFile() file: Express.Multer.File) {
    return this.lessonService.create(createLessonDto, file);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  findAll() {
    return this.lessonService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.lessonService.findOne(id, req.user.id, req.user.role);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.TEACHER)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('video', {
    storage: diskStorage({
      destination: './public/uploads/lessons',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `lesson-${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
  }))
  update(
    @Param('id') id: string,
    @Body() updateLessonDto: UpdateLessonDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.lessonService.update(id, updateLessonDto, file);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.TEACHER)
  remove(@Param('id') id: string) {
    return this.lessonService.remove(id);
  }
}
