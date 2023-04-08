import express from "express"
import { UserController } from "../controller/UserController"
import { UserBusiness } from "../business/UserBusiness"
import { UserDatabase } from "../data/UserDatabase"
import { HashGenerator } from "../services/HashGenerator"
import { Authenticator } from "../services/Authenticator"

export const userRouter = express.Router()

const userDatabase = new UserDatabase()
const userBusiness = new UserBusiness(userDatabase, new HashGenerator(), new Authenticator())
const userController = new UserController(userBusiness)

userRouter.post("/signup", (req, res) => userController.signup(req, res))
userRouter.post("/login", (req, res) => userController.login(req, res))
userRouter.get("/account", (req, res) => userController.getAccountInfo(req, res))
userRouter.delete("/account", (req, res) => userController.deleteAccount(req, res))