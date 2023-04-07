import { CustomError } from "../error/CustomError"
import { MissingEmployeeName } from "../error/employeeErrors"
import { DuplicateProject, EmployeeNotFound, InvalidDates, InvalidEndDate, InvalidParticipation, InvalidProjectName, InvalidStartDate, MissingEndDate, MissingParticipation, MissingProjectName, MissingStartDate, ParticipationRateExceeded, ProjectNotFound } from "../error/projectErrors"
import { MissingToken } from "../error/userErrors"
import { IAuthenticator } from "../model/IAuthenticator"
import { Project, addCollaboratorDTO, inputAddEmployeeToAprojectDTO, inputRegisterProjectDTO } from "../model/Project"
import { ProjectRepository } from "../model/repositories/ProjectRepository"
import { UserRepository } from "../model/repositories/UserRepository"
import { validateDate } from "../utils/validateDate"


export class ProjectBusiness {
    constructor (
        private projectDatabase: ProjectRepository,
        private userDatabase: UserRepository,
        private authenticator: IAuthenticator
    ) {}

    public registerProject = async (input: inputRegisterProjectDTO): Promise<void> => {
        try {
            if (!input.token) {
                throw new MissingToken()
            }
            
            const {id} = await this.authenticator.getTokenData(input.token)

            if (!input.projectName) {
                throw new MissingProjectName()
            }
            if (input.projectName.length < 3) {
                throw new InvalidProjectName()
            }
            if (!input.startDate) {
                throw new MissingStartDate()
            }
            if (!validateDate(input.startDate)) {
                throw new InvalidStartDate()
            }
            if (!input.endDate) {
                throw new MissingEndDate()
            }
            if (!validateDate(input.endDate)) {
                throw new InvalidEndDate()
            }

            const formattedStartDate = new Date(input.startDate.split("/").reverse().join(","))
            const formattedEndDate = new Date(input.endDate.split("/").reverse().join(","))

            if (formattedEndDate.valueOf() < formattedStartDate.valueOf()) {
                throw new InvalidDates()
            }

            const user = await this.userDatabase.getUserById(id)

            const findProject = user!.projects.filter(project => project.project_name === input.projectName)
            if (findProject.length > 0) {
                throw new DuplicateProject()
            }
            
            const newProject = new Project(input.projectName, input.startDate, input.endDate, [])
            await this.projectDatabase.registerProject(id, newProject)

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    public addEmployeeToAproject = async (input: inputAddEmployeeToAprojectDTO): Promise<void> => {
        try {
            if (!input.token) {
                throw new MissingToken()
            }
            
            const {id} = await this.authenticator.getTokenData(input.token)

            if (!input.projectName) {
                throw new MissingProjectName()
            }

            const user = await this.userDatabase.getUserById(id)
            const getProject = user!.projects.filter(project => project.project_name === input.projectName)

            if (getProject.length === 0) {
                throw new ProjectNotFound()
            }

            if (!input.employeeName) {
                throw new MissingEmployeeName()
            }

            const getEmployee = user!.employees.filter(employee => employee.employee_name === input.employeeName)
            if (getEmployee.length === 0) {
                throw new EmployeeNotFound()
            }

            if (!input.participation) {
                throw new MissingParticipation()
            }
            if (input.participation <= 0 || input.participation > 100) {
                throw new InvalidParticipation()
            }

            if (getProject[0].collaborators.length > 0) {
                let sum = 0
                getProject[0].collaborators.forEach(collaborator => {
                    sum += collaborator.participation
                })

                if (sum > 100) {
                    throw new ParticipationRateExceeded()
                }
            }

            const addCollaborator: addCollaboratorDTO = {
                id,
                projectName: input.projectName,
                employeeName: input.employeeName,
                participation: input.participation
            }

            await this.projectDatabase.addEmpoyeeToAproject(addCollaborator)
            
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}
