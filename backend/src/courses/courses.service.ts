import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CourseDTO } from './dto/courses.dto';

@Injectable()
export class CoursesService {
	constructor(private readonly prisma: PrismaService) {}

	async getCourses(searchTerm?: string) {
		if (searchTerm) return await this.getSearchTermFilter(searchTerm);
		return this.prisma.course.findMany({
			orderBy: {
				createdAt: 'desc'
			},
			include: {
				lessons: true,
				enrollments: true
			}
		});
	}

	async getCourseById(id: string) {
		return await this.prisma.course.findUnique({
			where: {
				id
			}
		});
	}

	async create(dto: CourseDTO) {
		return this.prisma.course.create({
			data: {
				title: dto.title,
				description: dto.description,
				image: dto.image,
				teacherId: dto.teacherId
			}
		});
	}

	async update(id: string, dto: CourseDTO) {
		return this.prisma.course.update({
			where: {
				id
			},
			data: {
				title: dto.title,
				description: dto.description,
				image: dto.image,
				teacherId: dto.teacherId
			}
		});
	}

	async delete(id: string) {
		return this.prisma.course.delete({
			where: {
				id
			}
		});
	}

	private async getSearchTermFilter(searchTerm: string) {
		return this.prisma.course.findMany({
			where: {
				OR: [
					{
						title: {
							contains: searchTerm,
							mode: 'insensitive'
						},
						description: {
							contains: searchTerm,
							mode: 'insensitive'
						}
					}
				]
			}
		});
	}
}
