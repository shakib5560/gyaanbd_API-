import { IsNotEmpty, IsString, IsOptional, IsNumber, IsBoolean, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCourseDto {
  @ApiProperty({ example: 'Complete NestJS Course' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ example: 'Learn building robust APIs with NestJS' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'Beginner' })
  @IsString()
  @IsNotEmpty()
  level: string;

  @ApiProperty({ example: 'uuid-of-teacher' })
  @IsUUID()
  @IsNotEmpty()
  teacherId: string;

  @ApiPropertyOptional({ example: 49.99 })
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiPropertyOptional({ example: false })
  @IsBoolean()
  @IsOptional()
  isFree?: boolean;

  @ApiPropertyOptional({ example: 'uuid-of-category' })
  @IsUUID()
  @IsOptional()
  categoryId?: string;

  @ApiPropertyOptional({ example: 'https://example.com/thumbnail.jpg' })
  @IsString()
  @IsOptional()
  thumbnail?: string;
}
