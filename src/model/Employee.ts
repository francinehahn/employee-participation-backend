export enum employeeStatus {
    active="active",
    inactive="inactive"
}

export class Employee {
    constructor (
        readonly employee_name: string,
        readonly status: employeeStatus
    ) {
        this.employee_name = employee_name
        this.status = status
    }
}

export interface inputRegisterEmployeeDTO {
    employeeName: string,
    status: employeeStatus,
    token: string
}

export interface inputGetAllEmployeesDTO {
    search: string,
    token: string
}