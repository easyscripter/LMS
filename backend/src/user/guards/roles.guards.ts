import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	matchRules(roles: Role[], userRole: Role) {
		return roles.some(role => role === userRole);
	}

	canActivate(context: ExecutionContext) {
		const roles = this.reflector.get<Role[]>('roles', context.getHandler());
		if (!roles) {
			return true;
		}
		const request = context.switchToHttp().getRequest();
		const user = request.user;
		return this.matchRules(roles, user?.role);
	}
}
