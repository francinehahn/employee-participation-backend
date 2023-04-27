import { Project, addCollaboratorDTO, deleteCollaboratorDTO, deleteProjectDTO } from "../../src/model/Project"
import { ProjectRepository } from "../../src/model/repositories/ProjectRepository"


export class ProjectDatabaseMock implements ProjectRepository {
    public registerProject = async (id: string, newProject: Project): Promise<void> => {}

    public assignCollaboratorToAproject = async (newCollaborator: addCollaboratorDTO): Promise<void> => {}

    public editProjectInfo = async (id: string, currentProjectName: string, project: Project): Promise<void> => {}

    public deleteCollaborator = async (collaborator: deleteCollaboratorDTO): Promise<void> => {}

    public deleteProject = async (data: deleteProjectDTO): Promise<void> => {}
}