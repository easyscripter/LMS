import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { getJWTConfig } from 'src/config/jwt.config';
import { PrismaService } from 'src/prisma.service';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
	imports: [
		UserModule,
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: getJWTConfig,
			inject: [ConfigService]
		})
	],
	controllers: [AuthController],
	providers: [AuthService, PrismaService, UserService, JwtStrategy]
})
export class AuthModule {}
