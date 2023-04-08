import { Project, addCollaboratorDTO, updateParticipationDTO } from "../Project"


export interface ProjectRepository {
    registerProject (id: string, newProject: Project): Promise<void>
    addEmpoyeeToAproject (input: addCollaboratorDTO): Promise<void>
    getAllProjects (id: string): Promise<Project[] | []>
    deleteCollaborator (collaborator: updateParticipationDTO): Promise<void>
    editProjectInfo (id: string, currentProjectName: string, project: Project): Promise<void>
}