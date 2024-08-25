import { Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { AuthDTO } from 'src/auth/dto/auth.dto';
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

	async update(userId: string, dto: AuthDTO) {
		return await this.prisma.user.update({
			where: {
				id: userId
			},
			data: {
				name: dto.name,
				email: dto.email,
				password: await hash(dto.password),
				username: dto.username,
				surname: dto.surname
			}
		});
	}

	async delete(userId: string) {
		return await this.prisma.user.delete({
			where: {
				id: userId
			},
			include: {
				enrollments: true
			}
		});
	}

	async getUserProfile(userId: string) {
		return await this.prisma.user.findUnique({
			where: {
				id: userId
			},
			select: {
				id: true,
				name: true,
				email: true,
				username: true,
				surname: true,
				lastname: true,
				role: true
			}
		});
	}

	async getUserCourses(userId: string) {
		const courses = await this.prisma.enrollment.findMany({
			where: {
				userId
			},
			include: {
				course: true
			}
		});
		return courses;
	}

	async getTeacherCourses(userId: string) {
		const courses = await this.prisma.course.findMany({
			where: {
				teacherId: userId
			},
			include: {
				lessons: true
			}
		});
		return courses;
	}
}
