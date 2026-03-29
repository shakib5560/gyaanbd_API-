import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from "./dto/createUser.dto";
import { LoginUserDto } from "./dto/loginUser.dto";
import { AuthGuard } from "./auth.guard";
import { Public } from './public.decorator';
import { User } from "./user.decorator";
import { UserService } from "../user/user.service";
import type { JwtPayload } from "../../types/jwt-payload.type";

@UseGuards(AuthGuard) // ✅ Apply guard to all routes
@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService,
        private readonly userService: UserService
    ) {}

    // Public route
    @Public()
    @Post('signup')
    async createUser(@Body() createUserDto: CreateUserDto) {
        return this.authService.create(createUserDto);
    }

    // Public route
    @Public()
    @Post('login')
    async loginUser(@Body() loginUserDto: LoginUserDto) {
        return this.authService.login(loginUserDto);
    }

    // Protected route
    @Get('me')
    async getProfile(@User() user: JwtPayload) {
        // TS knows `user.sub`, `user.email`, `user.role`
        return this.userService.getUserById(Number(user.sub));
    }

    @Public()
    @Post('reset-password')
    async resetPassword(@Body() body: any) {
        return this.authService.resetPassword(body);
    }

    @Public()
    @Post('verify-email')
    async verifyEmail(@Body() body: any) {
        return this.authService.verifyEmail(body.email, body.otp);
    }

    @Public()
    @Post('forgot-password')
    async forgotPassword(@Body() body: any) {
        return this.authService.forgotPassword(body.email);
    }

    // Protected route (no @Public decorator)
    @Post('change-password')
    async changePassword(@User() user: JwtPayload, @Body() body: any) {
        return this.authService.changePassword(Number(user.sub), body);
    }
}