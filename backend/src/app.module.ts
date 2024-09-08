import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CoursesModule } from './courses/courses.module';
import { FileModule } from './file/file.module';
import { UserModule } from './user/user.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		AuthModule,
		UserModule,
		CoursesModule,
		FileModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}
