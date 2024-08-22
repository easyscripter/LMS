import { Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthDTO } from 'src/dto/auth.dto';
import { Roles } from './decorators/roles.decorator';
import { CurrentUser } from './decorators/user.decorator';
import { RolesGuard } from './guards/roles.guards';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@UseGuards(JwtAuthGuard)
	@Get('profile')
	async getUserProfile(@CurrentUser('id') id: string) {
		return this.userService.getUserProfile(id);
	}

	@UseGuards(JwtAuthGuard)
	@Get('courses')
	async getUserCourses(@CurrentUser('id') id: string) {
		return this.userService.getUserCourses(id);
	}

	@UseGuards(JwtAuthGuard)
	@Patch('profile')
	async updateUserProfile(@CurrentUser('id') id: string, dto: AuthDTO) {
		return this.userService.update(id, dto);
	}

	@Roles(Role.TEACHER)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('teacher-courses')
	async getTeacherCourses(@CurrentUser('id') id: string) {
		return this.userService.getTeacherCourses(id);
	}
}
