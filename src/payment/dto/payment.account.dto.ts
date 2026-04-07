import { IsEnum, IsString, IsOptional } from 'class-validator';

export enum PaymentMethod {
    BKASH = 'BKASH',
    NAGAD = 'NAGAD',
    ROCKET = 'ROCKET',
    WALLET = 'WALLET',
    SSLCOMMERZ = 'SSLCOMMERZ',
}

export class CreatePaymentAccountDto {

    @IsEnum(PaymentMethod)
    method: PaymentMethod;

    @IsString()
    number: string;

    @IsOptional()
    @IsString()
    name?: string;
}