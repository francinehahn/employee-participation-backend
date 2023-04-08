import { Project, addCollaboratorDTO, deleteCollaboratorDTO, deleteProjectDTO, updateParticipationDTO } from "../Project"


export interface ProjectRepository {
    registerProject (id: string, newProject: Project): Promise<void>
    assignCollaboratorToAproject (input: addCollaboratorDTO): Promise<void>
    getAllProjects (id: string): Promise<Project[] | []>
    deleteCollaborator (collaborator: deleteCollaboratorDTO): Promise<void>
    editProjectInfo (id: string, currentProjectName: string, project: Project): Promise<void>
    deleteProject (data: deleteProjectDTO): Promise<void>
}