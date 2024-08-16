import { MinLength } from 'class-validator';

export class AuthDTO {
	username: string;
	@MinLength(8, {
		message: 'Пароль должен содержать не менее 8 символов'
	})
	password: string;
	email: string;
	name: string;
	surname: string;
}
