import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

export class JwtAuthGuard extends AuthGuard('jwt') {
	canActivate(
		context: ExecutionContext
	): boolean | Promise<boolean> | Observable<boolean> {
		return super.canActivate(context);
	}

	handleRequest(err: any, user: any): any {
		if (err || !user) {
			throw err || new UnauthorizedException('user is not authorized');
		}
		console.log(user);

		return user;
	}
}
