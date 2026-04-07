import { IsString, IsUUID, IsOptional, IsInt, Min, IsUrl } from 'class-validator';

export class CreateLessonDto {
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    content?: string; // markdown/html

    @IsOptional()
    @IsUrl()
    videoUrl?: string;

    @IsUUID()
    moduleId: string;

    @IsInt()
    @Min(0)
    order: number;
}