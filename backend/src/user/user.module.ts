import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PrismaService } from 'src/prisma.service';
import { RolesGuard } from './guards/roles.guards';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
	controllers: [UserController],
	providers: [
		UserService,
		PrismaService,
		{
			provide: APP_GUARD,
			useClass: RolesGuard
		}
	]
})
export class UserModule {}
