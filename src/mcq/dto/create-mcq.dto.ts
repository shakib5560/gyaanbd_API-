import {
    IsString,
    IsUUID,
    IsArray,
    ArrayMinSize,
} from 'class-validator';

export class CreateMcqDto {
    @IsUUID()
    courseId: string;

    @IsUUID()
    teacherId: string;

    @IsString()
    question: string;

    @IsArray()
    @ArrayMinSize(2)
    options: string[]; // ["A", "B", "C", "D"]

    @IsString()
    correctAnswer: string;
}