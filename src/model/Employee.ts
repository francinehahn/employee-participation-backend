export enum employeeStatus {
    active="active",
    inactive="inactive"
}

export class Employee {
    constructor (
        private first_name: string,
        private last_name: string,
        private status: employeeStatus
    ) {
        this.first_name = first_name
        this.last_name = last_name
        this,status = status
    }
}