import {
	Body,
	Controller,
	HttpCode,
	Post,
	Req,
	Res,
	UnauthorizedException,
	UsePipes,
	ValidationPipe
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthDTO } from '../dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login')
	async login(@Body() dto: AuthDTO, @Res({ passthrough: true }) res: Response) {
		const data = await this.authService.login(dto);
		if ('refreshToken' in data) {
			const { refreshToken, ...response } = data;
			this.authService.addRefreshTokenToResponse(res, refreshToken);
			return response;
		}
		return data;
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('register')
	async register(
		@Body() dto: AuthDTO,
		@Res({ passthrough: true }) res: Response
	) {
		const data = await this.authService.register(dto);
		if ('refreshToken' in data) {
			const { refreshToken, ...response } = data;
			this.authService.addRefreshTokenToResponse(res, refreshToken);
			return response;
		}
		return data;
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('access-token')
	async getAccessToken(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response
	) {
		const refreshTokenFromCookies =
			req.cookies[this.authService.REFRESH_TOKEN_NAME];

		if (!refreshTokenFromCookies) {
			this.authService.removeRefreshTokenFromResponse(res);
			throw new UnauthorizedException('Refresh token not valid');
		}

		const { refreshToken, ...response } = await this.authService.getNewTokens(
			refreshTokenFromCookies
		);
		this.authService.addRefreshTokenToResponse(res, refreshToken);
		return response;
	}

	@HttpCode(200)
	@Post('logout')
	async logout(@Res({ passthrough: true }) res: Response) {
		this.authService.removeRefreshTokenFromResponse(res);
	}
}
