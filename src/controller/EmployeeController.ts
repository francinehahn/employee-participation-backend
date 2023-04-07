import { Request, Response } from "express"
import { EmployeeBusiness } from "../business/EmployeeBusiness"
import { inputRegisterEmployeeDTO } from "../model/Employee"


export class EmployeeController {
    constructor (
        private employeeBusiness: EmployeeBusiness
    ) {}

    public registerEmployee = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: inputRegisterEmployeeDTO = {
                employeeName: req.body.employeeName,
                status: req.body.status,
                token: req.headers.authorization as string
            }

            await this.employeeBusiness.registerEmployee(input)
            res.status(201).send("Success! The employee has been registered!")

        } catch (error: any) {
            res.status(error.statusCode || 400).send(error.message)
        }
    }
}