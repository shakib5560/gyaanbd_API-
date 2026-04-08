import { ApiProperty } from '@nestjs/swagger';
import {
    IsString,
    IsUUID,
    IsArray,
    ArrayMinSize,
} from 'class-validator';

export class CreateMcqDto {
    @ApiProperty({ example: 'uuid-course-id' })
    @IsUUID()
    courseId: string;

    @ApiProperty({ example: 'uuid-teacher-id' })
    @IsUUID()
    teacherId: string;

    @ApiProperty({ example: 'What is the capital of France?' })
    @IsString()
    question: string;

    @ApiProperty({ example: ['A', 'B', 'C', 'D'] })
    @IsArray()
    @ArrayMinSize(2)
    options: string[]; // ["A", "B", "C", "D"]

    @ApiProperty({ example: 'Paris' })
    @IsString()
    correctAnswer: string;
}