import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CourseDTO {
	@MinLength(4, {
		message: 'title must have min length of 4'
	})
	title: string;
	@MinLength(4, {
		message: 'description must have min length of 4'
	})
	description: string;
	@IsString({
		message: 'image must be a string',
		each: true
	})
	@IsNotEmpty({
		each: true,
		message: 'image must not be empty'
	})
	image: string;

	@IsString({
		message: 'teacherId must be a string'
	})
	teacherId: string;
}
