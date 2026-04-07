import {
    IsUUID,
    IsNumber,
    Min,
    IsEnum,
    IsOptional,
    IsString,
    IsUrl,
} from 'class-validator';

export enum PaymentMethod {
    BKASH = 'BKASH',
    NAGAD = 'NAGAD',
    ROCKET = 'ROCKET',
    WALLET = 'WALLET',
    SSLCOMMERZ = 'SSLCOMMERZ',
}

export class CreatePaymentDto {
    @IsUUID()
    courseId: string;

    @IsNumber()
    @Min(0)
    amount: number;

    @IsEnum(PaymentMethod)
    method: PaymentMethod;

    @IsOptional()
    @IsString()
    transactionId?: string; // manual payment trxId

    @IsOptional()
    @IsUrl()
    proofImage?: string; // screenshot upload
}