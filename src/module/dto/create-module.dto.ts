import { IsString, IsUUID, IsInt, Min, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateModuleDto {
    @ApiProperty({ example: 'Introduction to NestJS' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: 'uuid-of-course' })
    @IsUUID()
    @IsNotEmpty()
    courseId: string;

    @ApiProperty({ example: 1 })
    @IsInt()
    @Min(0)
    order: number;
}