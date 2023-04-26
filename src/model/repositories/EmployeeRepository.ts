import { Employee, updateEmployeeDbDTO } from "../Employee"

export interface EmployeeRepository {
    registerEmployee (id: string, newEmployee: Employee): Promise<void>
    editEmployeeStatus (id: string, updateEmployee: updateEmployeeDbDTO): Promise<void>
    getAllEmployees (id: string, search: string): Promise<Employee[] | []>
    deleteEmployee (id: string, employeeName: string): Promise<void>
}