import { CustomError } from "../error/CustomError"
import { Employee } from "../model/Employee"
import { UserModel } from "../model/UserModel"
import { EmployeeRepository } from "../model/repositories/EmployeeRepository"


export class EmployeeDatabase implements EmployeeRepository {
    public registerEmployee = async (id: string, newEmployee: Employee): Promise<void> => {
        try {
            await UserModel.updateOne({_id: id},{ $push: {employees: newEmployee}})
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}
