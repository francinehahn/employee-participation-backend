import { ProjectBusiness } from "../business/ProjectBusiness"
import { Request, Response } from "express"
import { inputAddEmployeeToAprojectDTO, inputDeleteCollaboratorDTO, inputDeleteProjectDTO, inputEditParticipationDTO, inputEditProjectInfoDTO, inputRegisterProjectDTO } from "../model/Project"


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

    public assignCollaboratorToAproject = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: inputAddEmployeeToAprojectDTO = {
                projectName: req.body.projectName,
                employeeName: req.body.employeeName,
                participation: Number(req.body.participation),
                token: req.headers.authorization as string
            }

            await this.projectBusiness.assignCollaboratorToAproject(input)
            res.status(201).send("Success! An employee has been assigned to a project!")

        } catch (error: any) {
            res.status(error.statusCode || 400).send(error.message)
        }
    }

    public editCollaboratorParticipation = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: inputEditParticipationDTO = {
                projectName: req.body.projectName,
                employeeName: req.body.employeeName,
                participation: Number(req.body.participation),
                token: req.headers.authorization as string
            }

            await this.projectBusiness.editCollaboratorParticipation(input)
            res.status(201).send("Success! The employee participation has been updated.")

        } catch (error: any) {
            res.status(error.statusCode || 400).send(error.message)
        }
    }

    public getAverageParticipation = async (req: Request, res: Response): Promise<void> => {
        try {
            const token = req.headers.authorization as string

            const result = await this.projectBusiness.getAverageParticipation(token)
            res.status(200).send(result)

        } catch (error: any) {
            res.status(error.statusCode || 400).send(error.message)
        }
    }

    public editProjectInfo = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: inputEditProjectInfoDTO = {
                currentProjectName: req.body.currentProjectName,
                newProjectName: req.body.newProjectName,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                token: req.headers.authorization as string
            }

            await this.projectBusiness.editProjectInfo(input)
            res.status(201).send("Success! The project information has been updated.")

        } catch (error: any) {
            res.status(error.statusCode || 400).send(error.message)
        }
    }

    public deleteProject = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: inputDeleteProjectDTO = {
                projectName: req.body.projectName,
                token: req.headers.authorization as string
            }

            await this.projectBusiness.deleteProject(input)
            res.status(201).send("Success! The project has been deleted.")

        } catch (error: any) {
            res.status(error.statusCode || 400).send(error.message)
        }
    }

    public deleteCollaborator = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: inputDeleteCollaboratorDTO = {
                projectName: req.body.projectName,
                collaborator: req.body.collaborator,
                token: req.headers.authorization as string
            }

            await this.projectBusiness.deleteCollaborator(input)
            res.status(201).send("Success! The collaborator has been deleted.")

        } catch (error: any) {
            res.status(error.statusCode || 400).send(error.message)
        }
    }
}
