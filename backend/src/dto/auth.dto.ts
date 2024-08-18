import { IsEmail, IsOptional, MinLength } from 'class-validator';

export class AuthDTO {
	@IsOptional()
	@MinLength(2, {
		message: 'name must have min length of 2'
	})
	name: string;
	@IsOptional()
	@MinLength(2, {
		message: 'surnname must have min length of 2'
	})
	surname: string;
	@IsOptional()
	@MinLength(2, {
		message: 'lastname must have min length of 2'
	})
	lastname: string;
	@MinLength(6, {
		message: 'password must have min length of 6'
	})
	password: string;
	@MinLength(2, {
		message: 'username must have min length of 2'
	})
	username: string;
	@IsOptional()
	@IsEmail(
		{},
		{
			message: 'email is not valid'
		}
	)
	email: string;
}
