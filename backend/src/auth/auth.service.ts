import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { AuthDTO } from 'src/dto/auth.dto';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
	REFRESH_TOKEN_NAME = 'refreshToken';
	EXPIRE_DAY_REFRESH_TOKEN = 1;
	constructor(
		private jwt: JwtService,
		private userService: UserService,
		private configService: ConfigService,
		private prisma: PrismaService
	) {}

	async login(dto: AuthDTO) {
		const user = await this.validateUser(dto);
		if ('id' in user) {
			const tokens = this.issueTokens(user.id);
			return { user, ...tokens };
		}
		return user;
	}

	async register(dto: AuthDTO) {
		const oldUser = await this.userService.getUserByUsername(dto.username);
		if (oldUser) {
			throw new BadRequestException('User already exists');
		}
		const user = await this.userService.create(dto);
		const tokens = this.issueTokens(user.id);
		return { user, ...tokens };
	}

	async getNewTokens(refreshToken: string) {
		const result = await this.jwt.verifyAsync(refreshToken);
		if (!result) throw new UnauthorizedException('Invalid token');
		const user = await this.userService.getUserById(result['id']);
		const tokens = this.issueTokens(user.id);
		return { user, ...tokens };
	}

	issueTokens(userId: string) {
		const data = { id: userId };
		const accessToken = this.jwt.sign(data, {
			expiresIn: '1h'
		});
		const refreshToken = this.jwt.sign(data, {
			expiresIn: '7d'
		});

		return { accessToken, refreshToken };
	}

	private async validateUser(dto: AuthDTO) {
		const user = await this.userService.getUserByUsername(dto.username);
		if (!user) return new NotFoundException('User not found');
		return user;
	}

	addRefreshTokenToResponse(res: Response, refreshToken: string) {
		const expiresIn = new Date();
		expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN);
		res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
			httpOnly: true,
			domain: this.configService.get('SERVER_DOMAIN'),
			expires: expiresIn,
			secure: true,
			sameSite: 'none'
		});
	}

	removeRefreshTokenFromResponse(res: Response) {
		res.cookie(this.REFRESH_TOKEN_NAME, {
			httpOnly: true,
			domain: this.configService.get('SERVER_DOMAIN'),
			expires: new Date(0),
			secure: true,
			sameSite: 'none'
		});
	}
}
