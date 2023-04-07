import { CustomError } from "../error/CustomError"
import { Project, addCollaboratorDTO, collaborator } from "../model/Project"
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

    public addEmpoyeeToAproject = async (newCollaborator: addCollaboratorDTO): Promise<void> => {
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
}