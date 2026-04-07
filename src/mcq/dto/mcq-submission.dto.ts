import { IsUUID, IsString } from 'class-validator';

export class CreateMcqSubmissionDto {
    @IsUUID()
    mcqId: string;

    @IsString()
    answer: string;
}