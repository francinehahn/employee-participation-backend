import { Request, Response } from "express"
import { EmployeeBusiness } from "../business/EmployeeBusiness"
import { inputDeleteEmployeeDTO, inputGetAllEmployeesDTO, inputGetEmployeeInfoDTO, inputRegisterEmployeeDTO } from "../model/Employee"


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

    public getAllEmployees = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: inputGetAllEmployeesDTO = {
                search: req.query.search as string,
                token: req.headers.authorization as string
            }

            const result = await this.employeeBusiness.getAllEmployees(input)
            res.status(200).send(result)

        } catch (error: any) {
            res.status(error.statusCode || 400).send(error.message)
        }
    }

    public getEmployeeInfo = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: inputGetEmployeeInfoDTO = {
                employeeName: req.params.employeeName,
                token: req.headers.authorization as string
            }

            const result = await this.employeeBusiness.getEmployeeInfo(input)
            res.status(200).send(result)

        } catch (error: any) {
            res.status(error.statusCode || 400).send(error.message)
        }
    }

    public deleteEmployee = async (req: Request, res: Response): Promise<void> => {
        try {
            const input: inputDeleteEmployeeDTO = {
                employeeName: req.body.employeeName,
                token: req.headers.authorization as string
            }

            const result = await this.employeeBusiness.deleteEmployee(input)
            res.status(201).send("Success! The employee has been deleted.")

        } catch (error: any) {
            res.status(error.statusCode || 400).send(error.message)
        }
    }
}