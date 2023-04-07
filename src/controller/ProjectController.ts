import { ProjectBusiness } from "../business/ProjectBusiness"
import { Request, Response } from "express"
import { inputAddEmployeeToAprojectDTO, inputRegisterProjectDTO } from "../model/Project"


export class ProjectController {
    constructor (
        private projectBusiness: ProjectBusiness
    ) {}

    public registerProject = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: inputRegisterProjectDTO = {
                projectName: req.body.projectName,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                token: req.headers.authorization as string
            }

            await this.projectBusiness.registerProject(input)
            res.status(201).send("Success! The project has been registered!")

        } catch (error: any) {
            res.status(error.statusCode || 400).send(error.message)
        }
    }

    public addEmployeeToAproject = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: inputAddEmployeeToAprojectDTO = {
                projectName: req.body.projectName,
                employeeName: req.body.employeeName,
                participation: Number(req.body.participation),
                token: req.headers.authorization as string
            }

            await this.projectBusiness.addEmployeeToAproject(input)
            res.status(201).send("Success! An employee has been assigned to a project!")

        } catch (error: any) {
            res.status(error.statusCode || 400).send(error.message)
        }
    }

    public getAllProjects = async (req: Request, res: Response): Promise<void> => {
        try {
            const token = req.headers.authorization as string
            const result = await this.projectBusiness.getAllProjects(token)
            res.status(200).send(result)

        } catch (error: any) {
            res.status(error.statusCode || 400).send(error.message)
        }
    }
}
