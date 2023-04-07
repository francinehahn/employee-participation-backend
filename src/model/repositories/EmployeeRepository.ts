import { Employee } from "../Employee"

export interface EmployeeRepository {
    registerEmployee (id: string, newEmployee: Employee): Promise<void>
    getAllEmployees (id: string, search: string): Promise<Employee[] | []>
}