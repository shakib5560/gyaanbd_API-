// Import core NestJS decorators and tools
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile
} from '@nestjs/common';

// Import service (business logic layer)
import { CategoryService } from './category.service';

// DTOs (data validation & structure)
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

// Auth & role-based access control
import { AuthGuard } from '../common/guard/auth.guard';
import { RolesGuard } from '../common/guard/roles.guard';
import { Roles } from '../common/decorator/roles.decorator';
import { Role } from '../common/enum/auth.enum';

// File upload (Multer)
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

// Swagger API documentation
import { ApiConsumes, ApiTags } from '@nestjs/swagger';

@ApiTags('categories') // Swagger grouping
@Controller('categories') // Base route: /categories
export class CategoryController {

  // Inject CategoryService
  constructor(private readonly categoryService: CategoryService) {}

  // =========================
  // CREATE CATEGORY (POST)
  // =========================
  @Post()
  @UseGuards(AuthGuard, RolesGuard) // Only authenticated users
  @Roles(Role.ADMIN) // Only ADMIN can create
  @ApiConsumes('multipart/form-data') // Accept file + body
  @UseInterceptors(
      FileInterceptor('thumbnail', { // Field name: thumbnail
        storage: diskStorage({
          destination: './public/uploads/thumbnails', // Save location
          filename: (req, file, cb) => {
            // Generate unique filename
            const uniqueSuffix =
                Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, `category-${uniqueSuffix}${extname(file.originalname)}`);
          },
        }),
      }),
  )
  create(
      @Body() createCategoryDto: CreateCategoryDto, // Request body
      @UploadedFile() file: Express.Multer.File // Uploaded file
  ) {
    // Call service to handle logic
    return this.categoryService.create(createCategoryDto, file);
  }

  // =========================
  // GET ALL CATEGORIES
  // =========================
  @Get()
  findAll() {
    // Public endpoint
    return this.categoryService.findAll();
  }

  // =========================
  // GET SINGLE CATEGORY
  // =========================
  @Get(':id')
  findOne(@Param('id') id: string) {
    // Fetch by ID
    return this.categoryService.findOne(id);
  }

  // =========================
  // UPDATE CATEGORY
  // =========================
  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard) // Protected route
  @Roles(Role.ADMIN) // Only ADMIN
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
      FileInterceptor('thumbnail', {
        storage: diskStorage({
          destination: './public/uploads/thumbnails',
          filename: (req, file, cb) => {
            const uniqueSuffix =
                Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, `category-${uniqueSuffix}${extname(file.originalname)}`);
          },
        }),
      }),
  )
  update(
      @Param('id') id: string, // Category ID
      @Body() updateCategoryDto: UpdateCategoryDto, // Updated data
      @UploadedFile() file: Express.Multer.File // Optional new thumbnail
  ) {
    return this.categoryService.update(id, updateCategoryDto, file);
  }

  // =========================
  // DELETE CATEGORY
  // =========================
  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard) // Protected
  @Roles(Role.ADMIN) // Only ADMIN
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}