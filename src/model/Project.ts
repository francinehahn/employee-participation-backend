export type collaborator = {
    employee_name: string,
    participation: number
}

export class Project {
    constructor (
        readonly project_name: string,
        readonly start_date: string,
        readonly end_date: string,
        readonly collaborators: collaborator[]
    ) {
        this.project_name = project_name
        this.start_date = start_date
        this.end_date = end_date
        this.collaborators = collaborators
    }
}

export interface inputRegisterProjectDTO {
    projectName: string,
    startDate: string,
    endDate: string,
    token: string
}

export interface inputAddEmployeeToAprojectDTO {
    projectName: string,
    employeeName: string,
    participation: number,
    token: string
}

export interface addCollaboratorDTO {
    id: string,
    projectName: string,
    employeeName: string,
    participation: number
}