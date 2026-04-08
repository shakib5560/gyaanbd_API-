import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';

export class CreateTeacherReviewDto {
    @ApiProperty({ example: 'uuid-of-teacher' })
    @IsUUID()
    teacherId: string;

    @ApiProperty({ example: 5, description: 'Rating from 1 to 5' })
    @IsInt()
    @Min(1)
    @Max(5)
    rating: number;

    @ApiProperty({ example: 'Excellent teaching style.', required: false })
    @IsOptional()
    @IsString()
    comment?: string;
}
