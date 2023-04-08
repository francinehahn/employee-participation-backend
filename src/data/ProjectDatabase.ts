import { CustomError } from "../error/CustomError"
import { Project, addCollaboratorDTO, deleteCollaboratorDTO, deleteProjectDTO, updateParticipationDTO } from "../model/Project"
import { UserModel } from "../model/UserModel"
import { ProjectRepository } from "../model/repositories/ProjectRepository"


export class ProjectDatabase implements ProjectRepository {
    public registerProject = async (id: string, newProject: Project): Promise<void> => {
        try {
            await UserModel.updateOne({_id: id}, { $push: {projects: newProject}})
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    public assignCollaboratorToAproject = async (newCollaborator: addCollaboratorDTO): Promise<void> => {
        try {
            await UserModel.updateOne(
                {'_id': newCollaborator.id, 'projects.project_name': newCollaborator.projectName},
                {$push: {'projects.$.collaborators': {
                    employee_name: newCollaborator.employeeName,
                    participation: newCollaborator.participation
                }}}
            )
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    public getAllProjects = async (id: string): Promise<Project[] | []> => {
        try {
            const result = await UserModel.find(
                {'_id': id},
                {_id: 0, user_name: 0, email: 0, password: 0, employees: 0}
            )

            return result[0].projects
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    public deleteCollaborator = async (collaborator: deleteCollaboratorDTO): Promise<void> => {
        try {
            await UserModel.updateOne(
                {'_id': collaborator.id, 'projects.project_name': collaborator.projectName},
                {$pull: {'projects.$.collaborators': {
                    employee_name: collaborator.collaborator
                }}}
            )
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    public editProjectInfo = async (id: string, currentProjectName: string, project: Project): Promise<void> => {
        try {
            await UserModel.updateOne(
                {_id: id, 'projects.project_name': currentProjectName},
                {$set: {'projects.$': project}}
            )
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    public deleteProject = async (data: deleteProjectDTO): Promise<void> => {
        try {
            await UserModel.updateOne(
                {'_id': data.id},
                {$pull: {projects: {
                    project_name: data.projectName
                }}}
            )
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}