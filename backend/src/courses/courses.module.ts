import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';

@Module({
	controllers: [CoursesController],
	providers: [CoursesService, PrismaService]
})
export class CoursesModule {}
