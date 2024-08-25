import {
	Controller,
	Delete,
	Get,
	HttpCode,
	Patch,
	Req,
	UseGuards,
	UsePipes,
	ValidationPipe
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { AuthDTO } from 'src/auth/dto/auth.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from './decorators/roles.decorator';
import { CurrentUser } from './decorators/user.decorator';
import { RoleGuard } from './guards/roles.guards';
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

	@UsePipes(new ValidationPipe())
	@UseGuards(JwtAuthGuard)
	@Patch('profile')
	async updateUserProfile(@CurrentUser('id') id: string, dto: AuthDTO) {
		return this.userService.update(id, dto);
	}

	@Roles(Role.TEACHER, Role.ADMIN)
	@UseGuards(JwtAuthGuard, RoleGuard)
	@Get('teacher-courses')
	async getTeacherCourses(@Req() req, @CurrentUser('id') id: string) {
		return this.userService.getTeacherCourses(id);
	}

	@HttpCode(200)
	@Roles(Role.ADMIN)
	@UseGuards(JwtAuthGuard, RoleGuard)
	@Delete(':id')
	async deleteUser(@Req() req, @CurrentUser('id') id: string) {
		return this.userService.delete(id);
	}
}
