import { CustomError } from "../error/CustomError"
import { Employee, updateEmployeeDbDTO } from "../model/Employee"
import { UserModel } from "../model/UserModel"
import { EmployeeRepository } from "../model/repositories/EmployeeRepository"


export class EmployeeDatabase implements EmployeeRepository {
    public registerEmployee = async (id: string, newEmployee: Employee): Promise<void> => {
        try {
            await UserModel.updateOne({_id: id}, { $push: {employees: newEmployee}})
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    public editEmployeeStatus = async (id: string, updateEmployee: updateEmployeeDbDTO): Promise<void> => {
        try {
            await UserModel.updateOne(
                {_id: id, 'employees.employee_name': updateEmployee.employee_name},
                {$set: {'employees.$': updateEmployee}}
            )
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    public getAllEmployees = async (id: string, search: string): Promise<Employee[] | []> => {
        try {
            const result = await UserModel.find(
                {'_id': id},
                {_id: 0, user_name: 0, email: 0, password: 0, projects: 0}
            )

            return !search? result[0].employees : result[0].employees.filter(item => item.status === search)
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    public deleteEmployee = async (id: string, employeeName: string): Promise<void> => {
        try {
            await UserModel.updateOne(
                {'_id': id},
                {$pull: {employees: {employee_name: employeeName}}}
            )

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}