import { IsUUID, IsEnum, IsOptional } from 'class-validator';

export enum PaymentStatus {
    PENDING = 'PENDING',
    SUCCESS = 'SUCCESS',
    FAILED = 'FAILED',
}

export class VerifyPaymentDto {
    @IsUUID()
    paymentId: string;

    @IsEnum(PaymentStatus)
    status: PaymentStatus;

    @IsOptional()
    gatewayPayload?: any;
}