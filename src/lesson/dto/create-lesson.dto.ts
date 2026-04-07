import { IsString, IsUUID, IsOptional, IsInt, Min, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLessonDto {
    @ApiProperty({ example: 'Introduction to NestJS' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiPropertyOptional({ example: 'Content in markdown' })
    @IsOptional()
    @IsString()
    content?: string;

    @ApiPropertyOptional({ example: 'path-to-video' })
    @IsOptional()
    @IsString()
    videoUrl?: string;

    @ApiProperty({ example: 'uuid-of-module' })
    @IsUUID()
    @IsNotEmpty()
    moduleId: string;

    @ApiProperty({ example: 1 })
    @IsInt()
    @Min(0)
    order: number;
}