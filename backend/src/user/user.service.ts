import { Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { AuthDTO } from 'src/dto/auth.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async getUserById(id: string) {
		return await this.prisma.user.findUnique({
			where: {
				id
			}
		});
	}

	async getUserByEmail(email: string) {
		return await this.prisma.user.findUnique({
			where: {
				email
			}
		});
	}

	async getUserByUsername(username: string) {
		return await this.prisma.user.findUnique({
			where: {
				username
			}
		});
	}

	async create(dto: AuthDTO) {
		return await this.prisma.user.create({
			data: {
				name: dto.name,
				email: dto.email,
				password: await hash(dto.password),
				username: dto.username,
				surname: dto.surname
			}
		});
	}
}
