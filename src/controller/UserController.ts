import { Request, Response } from "express"
import { UserBusiness } from "../business/UserBusiness"
import { inputLoginDTO, inputSignupDTO } from "../model/User"

export class UserController {
    constructor (
        private userBusiness: UserBusiness
    ) {}

    public signup = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: inputSignupDTO = {
                userName: req.body.userName,
                email: req.body.email,
                password: req.body.password
            }

            await this.userBusiness.signup(input)
            res.status(201).send("Success! The user has been registered!")

        } catch (error: any) {
            res.status(error.statusCode || 400).send(error.message)
        }
    }

    public login = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: inputLoginDTO = {
                email: req.body.email,
                password: req.body.password
            }

            const token = await this.userBusiness.login(input)
            res.status(201).send({token})

        } catch (error: any) {
            res.status(error.statusCode || 400).send(error.message)
        }
    }

    public getAccountInfo = async (req: Request, res: Response): Promise<void> => {
        try {
            const token = req.headers.authorization as string
            const result = await this.userBusiness.getAccountInfo(token)
            res.status(200).send(result)

        } catch (error: any) {
            res.status(error.statusCode || 400).send(error.message)
        }
    }
}