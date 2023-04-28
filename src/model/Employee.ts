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

export interface inputDeleteEmployeeDTO {
    employeeName: string,
    token: string
}

export interface inputGetEmployeeInfoDTO {
    employeeName: string,
    token: string
}

export interface outputGetEmployeeInfoDTO {
    project_name: string,
    start_date: string,
    end_date: string,
    participation: number
}

export interface inputEditEmployeeDTO {
    employeeName: string,
    newStatus: employeeStatus,
    token: string
}

export interface updateEmployeeDbDTO {
    employee_name: string,
    status: employeeStatus
}