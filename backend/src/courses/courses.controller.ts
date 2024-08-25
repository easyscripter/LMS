import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Query,
	Req,
	UseGuards,
	UsePipes,
	ValidationPipe
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/user/decorators/roles.decorator';
import { RoleGuard } from 'src/user/guards/roles.guards';
import { CoursesService } from './courses.service';
import { CourseDTO } from './dto/courses.dto';

@Controller('courses')
export class CoursesController {
	constructor(private readonly coursesService: CoursesService) {}

	@UseGuards(JwtAuthGuard)
	@Get()
	async getCourses(@Query('search') searchTerm?: string) {
		return this.coursesService.getCourses(searchTerm);
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	async getCourseById(@Param('id') id: string) {
		return this.coursesService.getCourseById(id);
	}

	@Roles(Role.TEACHER, Role.ADMIN)
	@UsePipes(new ValidationPipe())
	@UseGuards(JwtAuthGuard, RoleGuard)
	@Post('create')
	async createCourse(@Req() req, @Body() dto: CourseDTO) {
		return this.coursesService.create(dto);
	}
}
