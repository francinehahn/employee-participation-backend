import { CustomError } from "../error/CustomError"
import { DuplicateEmployee, InvalidEmployeeName, InvalidStatus, MissingEmployeeName, MissingStatus } from "../error/employeeErrors"
import { MissingToken } from "../error/userErrors"
import { Employee, employeeStatus, inputRegisterEmployeeDTO } from "../model/Employee"
import { IAuthenticator } from "../model/IAuthenticator"
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
            const findEmployee = user!.employees.filter(employee => employee.employee_name === input.employeeName)
            if (findEmployee.length > 0) {
                throw new DuplicateEmployee()
            }

            const newEmployee = new Employee(input.employeeName, input.status)
            await this.employeeDatabase.registerEmployee(id, newEmployee)

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}
