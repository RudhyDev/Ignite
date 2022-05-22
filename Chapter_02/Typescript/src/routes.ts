import { Request, Response} from 'express'
import CreateCourseService from './CreateCourseService'

export function CreateCourse(req: Request, res: Response) {
    CreateCourseService.execute({
        name: "Node JS",
        duration: 350,
        educator: "Diogo"
    })
    return res.send({ message: 'Create Course' })
}
