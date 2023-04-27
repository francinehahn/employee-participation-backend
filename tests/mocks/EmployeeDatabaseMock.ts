import { Employee, employeeStatus, updateEmployeeDbDTO } from "../../src/model/Employee"
import { EmployeeRepository } from "../../src/model/repositories/EmployeeRepository"


export class EmployeeDatabaseMock implements EmployeeRepository {
    public registerEmployee = async (id: string, newEmployee: Employee): Promise<void> => {}

    public editEmployeeStatus = async (id: string, updateEmployee: updateEmployeeDbDTO): Promise<void> => {}

    public getAllEmployees = async (id: string, search: string): Promise<Employee[] | []> => {
        const employees: Employee[] = [
            {
                employee_name: "Tábata Santos",
                status: employeeStatus.inactive
            },
            {
                employee_name: "João Pedro Saraiva",
                status: employeeStatus.active
            }
        ]

        const filterEmployees = employees.filter(item => item.status === search)

        return !search? employees : filterEmployees
    }

    public deleteEmployee = async (id: string, employeeName: string): Promise<void> => {}
}