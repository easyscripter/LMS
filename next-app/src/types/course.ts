export type Course = {
	id: number;
	title: string;
	description: string;
	image: string;
}

export type UserCoursesResponse = Course[];