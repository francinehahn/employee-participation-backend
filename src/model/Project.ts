type collaborator = {
    employee_name: string,
    participation: number
}

export class Project {
    constructor (
        private project_name: string,
        private start_date: Date,
        private end_date: Date,
        private collaborators: collaborator[]
    ) {
        this.project_name = project_name
        this.start_date = start_date
        this.end_date = end_date
        this.collaborators = collaborators
    }
}