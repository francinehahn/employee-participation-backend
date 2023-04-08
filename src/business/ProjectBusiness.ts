import { CustomError } from "../error/CustomError"
import { MissingEmployeeName } from "../error/employeeErrors"
import { DuplicateCollaborator, DuplicateProject, EmployeeNotFound, InvalidDates, InvalidEndDate, InvalidParticipation, InvalidProjectName, InvalidStartDate, MissingEndDate, MissingParticipation, MissingProjectName, MissingStartDate, ParticipationRateExceeded, ProjectNotFound } from "../error/projectErrors"
import { MissingToken } from "../error/userErrors"
import { Employee } from "../model/Employee"
import { IAuthenticator } from "../model/IAuthenticator"
import { collaborator, deleteProjectDTO, inputDeleteProjectDTO, inputEditParticipationDTO, inputEditProjectInfoDTO, updateParticipationDTO } from "../model/Project"
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

    public getAllProjects = async (token: string): Promise<Project[]> => {
        try {
            if (!token) {
                throw new MissingToken()
            }
            
            const {id} = await this.authenticator.getTokenData(token)
            const result = await this.projectDatabase.getAllProjects(id)
            return result
            
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    public editEmployeeParticipation = async (input: inputEditParticipationDTO): Promise<void> => {
        try {
            if (!input.token) {
                throw new MissingToken()
            }

            const {id} = await this.authenticator.getTokenData(input.token)

            if (!input.projectName) {
                throw new MissingParticipation()
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
            const prevParticipation = getEmployee[0].participation

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
                const collaborators = getProject[0].collaborators.filter((collaborator: collaborator) => collaborator.employee_name !==  input.employeeName)
                
                let sum = 0
                collaborators.forEach((collaborator: collaborator) => {
                    sum += collaborator.participation
                })

                if (sum + input.participation > 100) {
                    throw new ParticipationRateExceeded()
                }
            }
            
            const pull: updateParticipationDTO = {
                id,
                projectName: input.projectName,
                employeeName: input.employeeName,
                participation: prevParticipation
            }

            const push: updateParticipationDTO = {
                id,
                projectName: input.projectName,
                employeeName: input.employeeName,
                participation: input.participation
            }

            await this.projectDatabase.deleteCollaborator(pull)
            await this.projectDatabase.addEmpoyeeToAproject(push)
            
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
}
