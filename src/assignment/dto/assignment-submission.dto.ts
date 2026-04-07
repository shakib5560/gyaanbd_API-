import { IsUUID, IsOptional, IsUrl } from 'class-validator';

export class CreateAssignmentSubmissionDto {
    @IsUUID()
    assignmentId: string;

    @IsOptional()
    @IsUrl()
    fileUrl?: string;
}