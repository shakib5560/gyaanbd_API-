import { ApiProperty } from '@nestjs/swagger';
import {
    IsString,
    IsUUID,
    IsOptional,
    IsDateString,
} from 'class-validator';

export class CreateAssignmentDto {
    @ApiProperty({ example: 'uuid-course-id' })
    @IsUUID()
    courseId: string;

    @ApiProperty({ example: 'uuid-teacher-id' })
    @IsUUID()
    teacherId: string;

    @ApiProperty({ example: 'Project Phase 1' })
    @IsString()
    title: string;

    @ApiProperty({ example: 'Submit your initial design documents.', required: false })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ example: '2026-04-10T23:59:00Z' })
    @IsDateString()
    dueDate: string; // ISO format (e.g. 2026-04-10T23:59:00Z)
}