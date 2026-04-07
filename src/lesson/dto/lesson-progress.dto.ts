import { IsUUID, IsBoolean } from 'class-validator';

export class UpdateLessonProgressDto {
    @IsUUID()
    lessonId: string;

    @IsBoolean()
    isCompleted: boolean;
}