import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';

export class CreateCourseReviewDto {
    @ApiProperty({ example: 'uuid-of-course' })
    @IsUUID()
    courseId: string;

    @ApiProperty({ example: 5, description: 'Rating from 1 to 5' })
    @IsInt()
    @Min(1)
    @Max(5)
    rating: number;

    @ApiProperty({ example: 'Great course, very helpful!', required: false })
    @IsOptional()
    @IsString()
    comment?: string;
}
