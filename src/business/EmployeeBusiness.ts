import { CustomError } from "../error/CustomError"
import { DuplicateEmployee, InvalidEmployeeName, InvalidSearchTerm, InvalidSpacesEmployeeName, InvalidStatus, MissingEmployeeName, MissingStatus, NoCollaborationsFound, NoEmployeeRegistered, UnableToDeleteEmployee } from "../error/employeeErrors"
import { EmployeeNotFound } from "../error/projectErrors"
import { MissingToken } from "../error/userErrors"
import { Employee, employeeStatus, inputDeleteEmployeeDTO, inputEditEmployeeDTO, inputGetAllEmployeesDTO, inputGetEmployeeInfoDTO, inputRegisterEmployeeDTO, outputGetEmployeeInfoDTO, updateEmployeeDbDTO } from "../model/Employee"
import { IAuthenticator } from "../model/IAuthenticator"
import { Project, collaborator } from "../model/Project"
import { EmployeeRepository } from "../model/repositories/EmployeeRepository"
import { UserRepository } from "../model/repositories/UserRepository"


export class EmployeeBusiness {
    constructor (
        private employeeDatabase: EmployeeRepository,
        private userDatabase: UserRepository,
        private authenticator: IAuthenticator
    ) {}

    public registerEmployee = async (input: inputRegisterEmployeeDTO): Promise<void> => {
        try {
            if (!input.token) {
                throw new MissingToken()
            }

            const {id} = await this.authenticator.getTokenData(input.token)

            if (!input.employeeName) {
                throw new MissingEmployeeName()
            }
            if (input.employeeName.length < 8 || !input.employeeName.includes(" ")) {
                throw new InvalidEmployeeName()
            }
            if (!input.status) {
                throw new MissingStatus()
            }
            if (input.status.toLowerCase() !== employeeStatus.active && input.status.toLowerCase() !== employeeStatus.inactive) {
                throw new InvalidStatus()
            }

            const user = await this.userDatabase.getUserById(id)
            const findEmployee = user!.employees.filter((employee: Employee) => employee.employee_name === input.employeeName)
            if (findEmployee.length > 0) {
                throw new DuplicateEmployee()
            }

            const newEmployee = new Employee(input.employeeName, input.status)
            await this.employeeDatabase.registerEmployee(id, newEmployee)

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    public editEmployeeStatus = async (input: inputEditEmployeeDTO): Promise<void> => {
        try {
            if (!input.token) {
                throw new MissingToken()
            }

            const {id} = await this.authenticator.getTokenData(input.token)

            if (!input.employeeName) {
                throw new MissingEmployeeName()
            }
            if (!input.newStatus) {
                throw new MissingStatus()
            }
            if (input.newStatus.toLowerCase() !== employeeStatus.active && input.newStatus.toLowerCase() !== employeeStatus.inactive) {
                throw new InvalidStatus()
            }

            const user = await this.userDatabase.getUserById(id)
            const findEmployee = user!.employees.filter((employee: Employee) => employee.employee_name === input.employeeName)
            if (findEmployee.length === 0) {
                throw new EmployeeNotFound()
            }

            const updateEmployee: updateEmployeeDbDTO = {
                employee_name: input.employeeName,
                status: input.newStatus
            }

            await this.employeeDatabase.editEmployeeStatus(id, updateEmployee)

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    public getAllEmployees = async (input: inputGetAllEmployeesDTO): Promise<Employee[]> => {
        try {
            if (!input.token) {
                throw new MissingToken()
            }

            const {id} = await this.authenticator.getTokenData(input.token)

            if (input.search && input.search.toLowerCase() !== "active" && input.search.toLowerCase() !== "inactive") {
                throw new InvalidSearchTerm()
            }

            const result = await this.employeeDatabase.getAllEmployees(id, input.search)
            
            if (result.length === 0) {
                throw new NoEmployeeRegistered()
            }

            return result

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    public getEmployeeInfo = async (input: inputGetEmployeeInfoDTO): Promise<outputGetEmployeeInfoDTO[]> => {
        try {
            if (!input.token) {
                throw new MissingToken()
            }

            const {id} = await this.authenticator.getTokenData(input.token)

            if (!input.employeeName) {
                throw new MissingEmployeeName()
            }

            if (input.employeeName.includes(" ")) {
                throw new InvalidSpacesEmployeeName()
            }

            input.employeeName = input.employeeName.replaceAll("-", " ")

            const allEmployees = await this.employeeDatabase.getAllEmployees(id, "")
            const employeeExists = allEmployees.filter(item => item.employee_name === input.employeeName)
            if (employeeExists.length === 0) {
                throw new EmployeeNotFound()
            }

            const user = await this.userDatabase.getUserById(id)
            let projectsEmployeeParticipated: outputGetEmployeeInfoDTO[] = []

            user!.projects.forEach(project => {
                const isAcollaborator = project.collaborators.filter(employee => employee.employee_name === input.employeeName)
                if (isAcollaborator.length > 0) {
                    const numberOfCollaborators = project.collaborators.length
                    const sum = project.collaborators.reduce((prev, curr) => prev + curr.participation, 0)

                    projectsEmployeeParticipated.push({
                        project_name: project.project_name,
                        start_date: project.start_date,
                        end_date: project.end_date,
                        collaborator_participation: isAcollaborator[0].participation,
                        avg_participation: sum / numberOfCollaborators
                    })
                }
            })

            if (projectsEmployeeParticipated!.length === 0) {
                throw new NoCollaborationsFound()
            }

            return projectsEmployeeParticipated!.sort((a, b) => {
                const valueOfA = new Date(a.end_date.split("/").reverse().join(",")).valueOf()
                const valueOfB = new Date(b.end_date.split("/").reverse().join(",")).valueOf()
                
                if (valueOfA > valueOfB) {
                  return 1
                }
                if (valueOfA < valueOfB) {
                  return -1
                }
                
                return 0
            })

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    public deleteEmployee = async (input: inputDeleteEmployeeDTO): Promise<void> => {
        try {
            if (!input.token) {
                throw new MissingToken()
            }

            const {id} = await this.authenticator.getTokenData(input.token)

            if (!input.employeeName) {
                throw new MissingEmployeeName()
            }

            const allEmployees = await this.employeeDatabase.getAllEmployees(id, "")
            const findEmployee = allEmployees.filter((employee: Employee) => employee.employee_name === input.employeeName)
            
            if (findEmployee.length === 0) {
                throw new EmployeeNotFound()
            }

            const userInfo = await this.userDatabase.getUserById(id)
            userInfo!.projects.forEach((project: Project) => {
                const findEmployee = project.collaborators.filter((collaborator: collaborator) => collaborator.employee_name === input.employeeName)
                if (findEmployee.length > 0) {
                    throw new UnableToDeleteEmployee()
                }
            })

            await this.employeeDatabase.deleteEmployee(id, input.employeeName)

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}
