export class WalletBalanceDto {
    userId: string; // optional if using JWT
    balance: number;
}

import { IsUUID, IsNumber, Min } from 'class-validator';

export class UpdateWalletDto {
    @IsUUID()
    userId: string;

    @IsNumber()
    amount: number; }