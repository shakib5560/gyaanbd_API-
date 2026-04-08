import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateCourseReviewDto } from './dto/create-course-review.dto';
import { CreateTeacherReviewDto } from './dto/create-teacher-review.dto';
import { AuthGuard } from '../common/guard/auth.guard';
import { RolesGuard } from '../common/guard/roles.guard';
import { Roles } from '../common/decorator/roles.decorator';
import { Role } from '../common/enum/auth.enum';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {}

    @Post('course')
    @ApiBearerAuth()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.STUDENT)
    @ApiOperation({ summary: 'Submit a review for a course (Paid students only)' })
    createCourseReview(@Req() req: any, @Body() dto: CreateCourseReviewDto) {
        return this.reviewService.createCourseReview(req.user.id, dto);
    }

    @Post('teacher')
    @ApiBearerAuth()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.STUDENT)
    @ApiOperation({ summary: 'Submit a review for a teacher (Paid students only)' })
    createTeacherReview(@Req() req: any, @Body() dto: CreateTeacherReviewDto) {
        return this.reviewService.createTeacherReview(req.user.id, dto);
    }

    @Get('course/:courseId')
    @ApiOperation({ summary: 'Get all reviews for a course' })
    getCourseReviews(@Param('courseId') courseId: string) {
        return this.reviewService.getCourseReviews(courseId);
    }

    @Get('teacher/:teacherId')
    @ApiOperation({ summary: 'Get all reviews for a teacher' })
    getTeacherReviews(@Param('teacherId') teacherId: string) {
        return this.reviewService.getTeacherReviews(teacherId);
    }
}
