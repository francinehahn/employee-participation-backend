import { Employee } from "../Employee"

export interface EmployeeRepository {
    registerEmployee (id: string, newEmployee: Employee): Promise<void>
}