import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from './auth.service';
import { AuthDto } from "./dto";

@Controller('auth')
// global route for this module is given as arg to @Controller(<g-path>)
// e.g. sub-routes will /auth/<api-name>

export class AuthController {
	constructor(private authService: AuthService) {}

	// routes

	@Post('signup')
	// route: /auth/signup
	signup(@Body() dto: AuthDto) {
		return this.authService.signup(dto)
	}

	@Post('signin')
	signin(@Body() dto: AuthDto) {
		return this.authService.signin(dto)
	}
}