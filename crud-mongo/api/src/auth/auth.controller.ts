import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

import { UserDetails } from 'src/user/user-details.interface';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ExistingUserDto } from '../user/dto/existing-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    reisterUser(@Body() dto: CreateUserDto): Promise<UserDetails | string | null> {
        return this.authService.register(dto)
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    loginUser(@Body() dto: ExistingUserDto): Promise<{token: string} | null> {
        return this.authService.login(dto)
    }
}
