import express from "express"
import { ProjectController } from "../controller/ProjectController"
import { ProjectBusiness } from "../business/ProjectBusiness"
import { ProjectDatabase } from "../data/ProjectDatabase"
import { UserDatabase } from "../data/UserDatabase"
import { Authenticator } from "../services/Authenticator"

export const projectRouter = express.Router()

const userDatabase = new UserDatabase()
const projectDatabase = new ProjectDatabase()
const projectBusiness = new ProjectBusiness(projectDatabase, userDatabase, new Authenticator())
const projectController = new ProjectController(projectBusiness)

projectRouter.get("/avg-participation", (req, res) => projectController.getAverageParticipation(req, res))
projectRouter.patch("/register", (req, res) => projectController.registerProject(req, res))
projectRouter.patch("/edit", (req, res) => projectController.editProjectInfo(req, res))
projectRouter.patch("/add-collaborator", (req, res) => projectController.assignCollaboratorToAproject(req, res))
projectRouter.patch("/edit-collaborator", (req, res) => projectController.editCollaboratorParticipation(req, res))
projectRouter.patch("/delete-collaborator", (req, res) => projectController.deleteCollaborator(req, res))
projectRouter.patch("/", (req, res) => projectController.deleteProject(req, res))