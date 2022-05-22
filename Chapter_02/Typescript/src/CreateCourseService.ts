interface Course {
	name: string;
	duration: number;
	educator: string;
}

class CreateCourseService {
	execute({name, educator, duration}: Course) {
		console.log(name, duration, educator);
	}
}
export default new CreateCourseService();
