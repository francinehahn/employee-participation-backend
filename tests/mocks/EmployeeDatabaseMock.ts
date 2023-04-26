import { Employee, employeeStatus, updateEmployeeDbDTO } from "../../src/model/Employee"
import { EmployeeRepository } from "../../src/model/repositories/EmployeeRepository"


export class EmployeeDatabaseMock implements EmployeeRepository {
    public registerEmployee = async (id: string, newEmployee: Employee): Promise<void> => {}

    public editEmployeeStatus = async (id: string, updateEmployee: updateEmployeeDbDTO): Promise<void> => {}

    public getAllEmployees = async (id: string, search: string): Promise<Employee[] | []> => {
        const employees: Employee[] = [
            {
                employee_name: "Ana Castro",
                status: employeeStatus.active
            },
            {
                employee_name: "Maria Fontoura",
                status: employeeStatus.active
            },
            {
                employee_name: "Breno Fuchs",
                status: employeeStatus.inactive
            },
            {
                employee_name: "Lauren Tivolli",
                status: employeeStatus.active
            },
            {
                employee_name: "Glenda Huston",
                status: employeeStatus.inactive
            },
            {
                employee_name: "Clara Maria Justus",
                status: employeeStatus.active
            }
        ]

        const filterEmployees = employees.filter(item => item.status === search)

        return !search? employees : filterEmployees
    }

    public deleteEmployee = async (id: string, employeeName: string): Promise<void> => {}
}