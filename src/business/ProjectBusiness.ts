import { CustomError } from "../error/CustomError"
import { MissingEmployeeName, NoEmployeeRegistered } from "../error/employeeErrors"
import { CollaboratorNotFound, DuplicateCollaborator, DuplicateProject, EmployeeNotFound, InvalidDates, InvalidEndDate, InvalidParticipation, InvalidProjectName, InvalidSpaces, InvalidStartDate, MissingCollaborator, MissingEndDate, MissingParticipation, MissingProjectName, MissingStartDate, ParticipationRateExceeded, ProjectNotFound } from "../error/projectErrors"
import { MissingToken } from "../error/userErrors"
import { Employee } from "../model/Employee"
import { IAuthenticator } from "../model/IAuthenticator"
import { collaborator, deleteCollaboratorDTO, deleteProjectDTO, inputDeleteCollaboratorDTO, inputDeleteProjectDTO, inputEditParticipationDTO, inputEditProjectInfoDTO, inputGetAvgParticipationInAprojectDTO, outputGetAverageParticipationDTO, outputGetAvgParticipationInAprojectDTO, updateParticipationDTO } from "../model/Project"
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
            
            const findProject = user!.projects.filter((project: Project) => project.project_name === input.projectName)
            if (findProject.length > 0) {
                throw new DuplicateProject()
            }
            
            const newProject = new Project(input.projectName, input.startDate, input.endDate, [])
            await this.projectDatabase.registerProject(id, newProject)

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    public assignCollaboratorToAproject = async (input: inputAddEmployeeToAprojectDTO): Promise<void> => {
        try {
            if (!input.token) {
                throw new MissingToken()
            }
            
            const {id} = await this.authenticator.getTokenData(input.token)

            if (!input.projectName) {
                throw new MissingProjectName()
            }

            const user = await this.userDatabase.getUserById(id)
            const getProject = user!.projects.filter((project: Project) => project.project_name === input.projectName)

            if (getProject.length === 0) {
                throw new ProjectNotFound()
            }

            if (!input.employeeName) {
                throw new MissingEmployeeName()
            }

            const duplicateCollaborator = getProject[0].collaborators.filter((collaborator: collaborator) => collaborator.employee_name === input.employeeName)
            if (duplicateCollaborator.length > 0) {
                throw new DuplicateCollaborator()
            }

            const getEmployee = user!.employees.filter((employee: Employee) => employee.employee_name === input.employeeName)
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
                getProject[0].collaborators.forEach((collaborator: collaborator) => {
                    sum += collaborator.participation
                })

                if (sum + input.participation > 100) {
                    throw new ParticipationRateExceeded()
                }
            }

            const addCollaborator: addCollaboratorDTO = {
                id,
                projectName: input.projectName,
                employeeName: input.employeeName,
                participation: input.participation
            }

            await this.projectDatabase.assignCollaboratorToAproject(addCollaborator)
            
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    public editCollaboratorParticipation = async (input: inputEditParticipationDTO): Promise<void> => {
        try {
            if (!input.token) {
                throw new MissingToken()
            }

            const {id} = await this.authenticator.getTokenData(input.token)

            if (!input.projectName) {
                throw new MissingProjectName()
            }

            const user = await this.userDatabase.getUserById(id)
            const getProject = user!.projects.filter((project: Project) => project.project_name === input.projectName)

            if (getProject.length === 0) {
                throw new ProjectNotFound()
            }

            if (!input.employeeName) {
                throw new MissingEmployeeName()
            }
            
            const getEmployee = getProject[0].collaborators.filter((employee: collaborator) => employee.employee_name === input.employeeName)

            if (getEmployee.length === 0) {
                throw new EmployeeNotFound()
            }

            if (!input.participation) {
                throw new MissingParticipation()
            }
            if (input.participation <= 0 || input.participation > 100) {
                throw new InvalidParticipation()
            }

            const collaborators = getProject[0].collaborators.filter((collaborator: collaborator) => collaborator.employee_name !==  input.employeeName)
            let sum = 0
            
            collaborators.forEach((collaborator: collaborator) => {
                sum += collaborator.participation
            })

            if (sum + input.participation > 100) {
                throw new ParticipationRateExceeded()
            }
            
            const pull: deleteCollaboratorDTO = {
                id,
                projectName: input.projectName,
                collaborator: input.employeeName
            }

            const push: updateParticipationDTO = {
                id,
                projectName: input.projectName,
                employeeName: input.employeeName,
                participation: input.participation
            }

            await this.projectDatabase.deleteCollaborator(pull)
            await this.projectDatabase.assignCollaboratorToAproject(push)
            
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    public getAvgParticipationInAproject = async (input: inputGetAvgParticipationInAprojectDTO): Promise<outputGetAvgParticipationInAprojectDTO> => {
        try {
            if (!input.token) {
                throw new MissingToken()
            }

            const {id} = await this.authenticator.getTokenData(input.token)

            if (!input.projectName) {
                throw new MissingProjectName()
            }

            if (input.projectName.includes(" ")) {
                throw new InvalidSpaces()
            }

            const user = await this.userDatabase.getUserById(id)
            const getProject = user!.projects.filter((project: Project) => project.project_name === input.projectName.replaceAll("-", " "))

            if (getProject.length === 0) {
                throw new ProjectNotFound()
            }

            const numberOfCollaborators = getProject[0].collaborators.length
            const sum = getProject[0].collaborators.reduce((prev, curr) => prev + curr.participation, 0)
            
            const result = {
                project_name: input.projectName.replaceAll("-", " "),
                avg_participation: sum === 0? 0 : sum / numberOfCollaborators
            }
            
            return result

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    public getAvgParticipationOfEachEmployee = async (token: string): Promise<outputGetAverageParticipationDTO[]> => {
        try {
            if (!token) {
                throw new MissingToken()
            }

            const {id} = await this.authenticator.getTokenData(token)

            const user = await this.userDatabase.getUserById(id)
            
            const result: outputGetAverageParticipationDTO[] = []
            user!.employees.forEach(employee => {
                let sum = 0
                let n = 0

                user!.projects.forEach(project => {
                    const filter = project.collaborators.filter(collaborator => collaborator.employee_name === employee.employee_name)
                    if (filter.length > 0) {
                        sum += filter[0].participation
                        n += 1
                    }
                })

                if (sum === 0) {
                    result.push({employee_name: employee.employee_name, avg_participation: 0})    
                } else {
                    result.push({employee_name: employee.employee_name, avg_participation: Number((sum / n).toFixed(1))})
                }
            })

            if (result.length === 0) {
                throw new NoEmployeeRegistered()
            }
            
            return result.sort((a, b) => a.avg_participation > b.avg_participation? -1 : 1)
            
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    public editProjectInfo = async (input: inputEditProjectInfoDTO): Promise<void> => {
        try {
            if (!input.token) {
                throw new MissingToken()
            }

            const {id} = await this.authenticator.getTokenData(input.token)

            if (!input.currentProjectName) {
                throw new MissingProjectName()
            }

            const user = await this.userDatabase.getUserById(id)
            const getProject = user!.projects.filter((project: Project) => project.project_name === input.currentProjectName)

            if (getProject.length === 0) {
                throw new ProjectNotFound()
            }

            if (input.newProjectName) {
                const duplicateProjectName = user!.projects.filter((project: Project) => input.newProjectName === project.project_name)
                if (duplicateProjectName.length > 0 && input.newProjectName !== getProject[0].project_name) {
                    throw new DuplicateProject()
                }
            }

            if (!input.newProjectName) {
                input.newProjectName = getProject[0].project_name
            }
            if (input.startDate) {
                if (!validateDate(input.startDate)) {
                    throw new InvalidStartDate()
                }
            }
            if (!input.startDate) {
                input.startDate = getProject[0].start_date
            }
            if (input.endDate) {
                if (!validateDate(input.endDate)) {
                    throw new InvalidEndDate()
                }
            }
            if (!input.endDate) {
                input.endDate = getProject[0].end_date
            }

            const formattedStartDate = new Date(input.startDate.split("/").reverse().join(","))
            const formattedEndDate = new Date(input.endDate.split("/").reverse().join(","))

            if (formattedEndDate.valueOf() < formattedStartDate.valueOf()) {
                throw new InvalidDates()
            }
        
            const updateProject: Project = {
                project_name: input.newProjectName,
                start_date: input.startDate,
                end_date: input.endDate,
                collaborators: getProject[0].collaborators
            }

            await this.projectDatabase.editProjectInfo(id, input.currentProjectName, updateProject)
            
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    public deleteProject = async (input: inputDeleteProjectDTO): Promise<void> => {
        try {
            if (!input.token) {
                throw new MissingToken()
            }

            const {id} = await this.authenticator.getTokenData(input.token)

            if (!input.projectName) {
                throw new MissingProjectName()
            }

            const user = await this.userDatabase.getUserById(id)
            const getProject = user!.projects.filter((project: Project) => project.project_name === input.projectName)

            if (getProject.length === 0) {
                throw new ProjectNotFound()
            }

            const deleteData: deleteProjectDTO = {
                id,
                projectName: input.projectName
            }
            
            await this.projectDatabase.deleteProject(deleteData)
            
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    public deleteCollaborator = async (input: inputDeleteCollaboratorDTO): Promise<void> => {
        try {
            if (!input.token) {
                throw new MissingToken()
            }

            const {id} = await this.authenticator.getTokenData(input.token)

            if (!input.projectName) {
                throw new MissingProjectName()
            }

            const user = await this.userDatabase.getUserById(id)
            const getProject = user!.projects.filter((project: Project) => project.project_name === input.projectName)

            if (getProject.length === 0) {
                throw new ProjectNotFound()
            }

            if (!input.collaborator) {
                throw new MissingCollaborator()
            }
            
            const getCollaborator = getProject[0].collaborators.filter((collaborator: collaborator) => collaborator.employee_name === input.collaborator)
            if (getCollaborator.length === 0) {
                throw new CollaboratorNotFound()
            }

            const deleteData: deleteCollaboratorDTO = {
                id,
                projectName: input.projectName,
                collaborator: input.collaborator
            }

            await this.projectDatabase.deleteCollaborator(deleteData)

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}
