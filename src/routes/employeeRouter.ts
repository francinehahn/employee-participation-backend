import express from "express"
import { EmployeeController } from "../controller/EmployeeController"
import { EmployeeBusiness } from "../business/EmployeeBusiness"
import { EmployeeDatabase } from "../data/EmployeeDatabase"
import { Authenticator } from "../services/Authenticator"
import { UserDatabase } from "../data/UserDatabase"

export const employeeRouter = express.Router()

const userDatabase = new UserDatabase()
const employeeDatabase = new EmployeeDatabase()
const employeeBusiness = new EmployeeBusiness(employeeDatabase, userDatabase, new Authenticator())
const employeeController = new EmployeeController(employeeBusiness)

employeeRouter.patch("/register", (req, res) => employeeController.registerEmployee(req, res))
employeeRouter.patch("/delete", (req, res) => employeeController.deleteEmployee(req, res))
employeeRouter.get("/", (req, res) => employeeController.getAllEmployees(req, res))
employeeRouter.get("/info", (req, res) => employeeController.getEmployeeInfo(req, res))