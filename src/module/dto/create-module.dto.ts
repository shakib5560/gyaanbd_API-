import { IsString, IsUUID, IsInt, Min } from 'class-validator';

export class CreateModuleDto {
    @IsString()
    title: string;

    @IsUUID()
    courseId: string;

    @IsInt()
    @Min(0)
    order: number;
}