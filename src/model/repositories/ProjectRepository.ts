import { Project, addCollaboratorDTO } from "../Project"


export interface ProjectRepository {
    registerProject (id: string, newProject: Project): Promise<void>
    addEmpoyeeToAproject (input: addCollaboratorDTO): Promise<void>
}