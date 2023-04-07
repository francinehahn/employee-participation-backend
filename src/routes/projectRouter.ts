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

projectRouter.patch("/register", (req, res) => projectController.registerProject(req, res))
projectRouter.patch("/add-employee", (req, res) => projectController.addEmployeeToAproject(req, res))