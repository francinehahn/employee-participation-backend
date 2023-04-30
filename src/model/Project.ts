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

export interface inputEditParticipationDTO {
    projectName: string,
    employeeName: string,
    participation: number,
    token: string
}

export interface updateParticipationDTO {
    id: string,
    projectName: string,
    employeeName: string,
    participation: number
}

export interface inputEditProjectInfoDTO {
    currentProjectName: string,
    newProjectName: string,
    startDate: string,
    endDate: string,
    token: string
}

export interface inputDeleteProjectDTO {
    projectName: string,
    token: string
}

export interface inputGetAvgParticipationInAprojectDTO {
    projectName: string,
    token: string
}

export interface outputGetAvgParticipationInAprojectDTO {
    project_name: string,
    avg_participation: number
}
    

export interface deleteProjectDTO {
    id: string,
    projectName: string
}

export interface inputDeleteCollaboratorDTO {
    projectName: string,
    collaborator: string,
    token: string
}

export interface deleteCollaboratorDTO {
    id: string,
    projectName: string,
    collaborator: string
}

export interface outputGetAverageParticipationDTO {
    employee_name: string,
    avg_participation: number
}