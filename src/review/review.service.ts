import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseReviewDto } from './dto/create-course-review.dto';
import { CreateTeacherReviewDto } from './dto/create-teacher-review.dto';
import { PaymentStatus } from '@prisma/client';

@Injectable()
export class ReviewService {
    constructor(private prisma: PrismaService) {}

    async createCourseReview(userId: string, dto: CreateCourseReviewDto) {
        const student = await this.prisma.studentProfile.findUnique({
            where: { userId },
        });

        if (!student) {
            throw new ForbiddenException('Only students can leave reviews.');
        }

        // Check if student has paid for the course
        const payment = await this.prisma.payment.findFirst({
            where: {
                userId,
                courseId: dto.courseId,
                status: PaymentStatus.APPROVED,
            },
        });

        if (!payment) {
            throw new ForbiddenException('You must purchase the course before reviewing it.');
        }

        // Check if student is already enrolled (redundant but good)
        const enrollment = await this.prisma.courseEnrollment.findUnique({
            where: {
                courseId_studentId: {
                    courseId: dto.courseId,
                    studentId: student.id,
                },
            },
        });

        if (!enrollment) {
             throw new ForbiddenException('You are not enrolled in this course.');
        }

        return this.prisma.courseReview.create({
            data: {
                ...dto,
                studentId: student.id,
            },
        });
    }

    async createTeacherReview(userId: string, dto: CreateTeacherReviewDto) {
        const student = await this.prisma.studentProfile.findUnique({
            where: { userId },
        });

        if (!student) {
            throw new ForbiddenException('Only students can leave reviews.');
        }

        // Check if student has paid for ANY course by this teacher
        const payment = await this.prisma.payment.findFirst({
            where: {
                userId,
                course: {
                    teacherId: dto.teacherId,
                },
                status: PaymentStatus.APPROVED,
            },
        });

        if (!payment) {
            throw new ForbiddenException('You must purchase at least one course from this teacher before reviewing them.');
        }

        return this.prisma.teacherReview.create({
            data: {
                ...dto,
                studentId: student.id,
            },
        });
    }

    async getCourseReviews(courseId: string) {
        const reviews = await this.prisma.courseReview.findMany({
            where: { courseId },
            include: {
                student: {
                    include: {
                        user: { select: { username: true } },
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });

        const avgRating = reviews.length > 0
            ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
            : 0;

        return { reviews, avgRating: parseFloat(avgRating.toFixed(1)), count: reviews.length };
    }

    async getTeacherReviews(teacherId: string) {
        const reviews = await this.prisma.teacherReview.findMany({
            where: { teacherId },
            include: {
                student: {
                    include: {
                        user: { select: { username: true } },
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });

        const avgRating = reviews.length > 0
            ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
            : 0;

        return { reviews, avgRating: parseFloat(avgRating.toFixed(1)), count: reviews.length };
    }
}
