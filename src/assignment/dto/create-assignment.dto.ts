import {
    IsString,
    IsUUID,
    IsOptional,
    IsDateString,
} from 'class-validator';

export class CreateAssignmentDto {
    @IsUUID()
    courseId: string;

    @IsUUID()
    teacherId: string;

    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsDateString()
    dueDate: string; // ISO format (e.g. 2026-04-10T23:59:00Z)
}