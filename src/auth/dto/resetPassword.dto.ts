import {
    IsString,
    IsEmail,
    MinLength,
    IsOptional,
    ValidateIf
} from 'class-validator';

export class LoginUserDto {

    @ValidateIf(o => !o.email)   // only validate if email is NOT provided
    @IsString()
    username?: string;

    @ValidateIf(o => !o.username) // only validate if username is NOT provided
    @IsEmail()
    email?: string;

    @IsString()
    @MinLength(6)
    password: string;
}