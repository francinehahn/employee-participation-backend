import { EmployeeBusiness } from "../../src/business/EmployeeBusiness";
import { CustomError } from "../../src/error/CustomError";
import { employeeStatus } from "../../src/model/Employee";
import { AuthenticatorMock } from "../mocks/AuthenticatorMock";
import { EmployeeDatabaseMock } from "../mocks/EmployeeDatabaseMock";
import { UserDatabaseMock } from "../mocks/UserDatabaseMock";


const employeeBusiness = new EmployeeBusiness(new EmployeeDatabaseMock(), new UserDatabaseMock(), new AuthenticatorMock())

describe("Testing the registerEmployee endpoint", () => {
    test("Should not receive the token and then return a custom error", async () => {
        expect.assertions(3)

        try {
            const input = {
                employeeName: "João Santos",
                status: employeeStatus.active,
                token: ""
            }

            await employeeBusiness.registerEmployee(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Provide the token.")
        }
    })

    test("Should receive an invalid token and then return a custom error", async () => {
        expect.assertions(3)

        try {
            const input = {
                employeeName: "João Santos",
                status: employeeStatus.active,
                token: "invalidToken"
            }

            await employeeBusiness.registerEmployee(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(401)
            expect(error.message).toBe("Unauthorized user.")
        }
    })

    test("Should not receive the employee name and then return a custom error", async () => {
        expect.assertions(3)

        try {
            const input = {
                employeeName: "",
                status: employeeStatus.active,
                token: "token"
            }

            await employeeBusiness.registerEmployee(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Provide the employee's full name.")
        }
    })

    test("Should receive an invalid employee name and then return a custom error", async () => {
        expect.assertions(3)

        try {
            const input = {
                employeeName: "João",
                status: employeeStatus.active,
                token: "token"
            }

            await employeeBusiness.registerEmployee(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("The employee's full name must have at least 8 characters.")
        }
    })

    test("Should receive an employee name that is already registered and then return a custom error", async () => {
        expect.assertions(3)

        try {
            const input = {
                employeeName: "Tábata Santos",
                status: employeeStatus.active,
                token: "token"
            }

            await employeeBusiness.registerEmployee(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(409)
            expect(error.message).toBe("Employee already registered.")
        }
    })

    test("Should receive a valid input and not return a custom error", async () => {
        const input = {
            employeeName: "João Santos",
            status: employeeStatus.active,
            token: "token"
        }

        const result = await employeeBusiness.registerEmployee(input)
        expect(result).toBeUndefined()
    })
})


describe("Testing the editEmployeeStatus endpoint", () => {
    test("Should not receive the token and then return a custom error", async () => {
        expect.assertions(3)

        try {
            const input = {
                employeeName: "Tábata Santos",
                newStatus: employeeStatus.active,
                token: ""
            }

            await employeeBusiness.editEmployeeStatus(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Provide the token.")
        }
    })

    test("Should receive an invalid token and then return a custom error", async () => {
        expect.assertions(3)

        try {
            const input = {
                employeeName: "Tábata Santos",
                newStatus: employeeStatus.active,
                token: "invalidToken"
            }

            await employeeBusiness.editEmployeeStatus(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(401)
            expect(error.message).toBe("Unauthorized user.")
        }
    })

    test("Should not receive the employee name and then return a custom error", async () => {
        expect.assertions(3)

        try {
            const input = {
                employeeName: "",
                newStatus: employeeStatus.active,
                token: "token"
            }

            await employeeBusiness.editEmployeeStatus(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Provide the employee's full name.")
        }
    })

    test("Should receive an invalid employee name and then return a custom error", async () => {
        expect.assertions(3)

        try {
            const input = {
                employeeName: "João Santos",
                newStatus: employeeStatus.active,
                token: "token"
            }

            await employeeBusiness.editEmployeeStatus(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(404)
            expect(error.message).toBe("This employee has not been registered yet.")
        }
    })

    test("Should receive a valid input and not return a custom error", async () => {
        const input = {
            employeeName: "Tábata Santos",
            newStatus: employeeStatus.active,
            token: "token"
        }

        const result = await employeeBusiness.editEmployeeStatus(input)
        expect(result).toBeUndefined()
    })
})


describe("Testing the getEmployeeInfo endpoint", () => {
    test("Should not receive the token and then return a custom error", async () => {
        expect.assertions(3)

        try {
            const input = {
                employeeName: "Tábata Santos",
                token: ""
            }

            await employeeBusiness.getEmployeeInfo(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Provide the token.")
        }
    })

    test("Should receive an invalid token and then return a custom error", async () => {
        expect.assertions(3)

        try {
            const input = {
                employeeName: "Tábata Santos",
                token: "invalidToken"
            }

            await employeeBusiness.getEmployeeInfo(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(401)
            expect(error.message).toBe("Unauthorized user.")
        }
    })

    test("Should not receive the employee name and then return a custom error", async () => {
        expect.assertions(3)

        try {
            const input = {
                employeeName: "",
                token: "token"
            }

            await employeeBusiness.getEmployeeInfo(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Provide the employee's full name.")
        }
    })

    test("Should receive an employee name that does not exist in the db and then return a custom error", async () => {
        expect.assertions(3)

        try {
            const input = {
                employeeName: "Rogério Vilela",
                token: "token"
            }

            await employeeBusiness.getEmployeeInfo(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(404)
            expect(error.message).toBe("This employee has not been registered yet.")
        }
    })

    test("Should receive a valid input and not return a custom error", async () => {
        const input = {
            employeeName: "Tábata Santos",
            token: "token"
        }

        const result = await employeeBusiness.getEmployeeInfo(input)
        expect(result).toEqual([{"end_date": "03/04/2023", "participation": 20, "project_name": "Labefood", "start_date": "10/12/2022"}])
    })
})


describe("Testing the deleteEmployee endpoint", () => {
    test("Should not receive the token and then return a custom error", async () => {
        expect.assertions(3)

        try {
            const input = {
                employeeName: "Tábata Santos",
                token: ""
            }

            await employeeBusiness.deleteEmployee(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Provide the token.")
        }
    })

    test("Should receive an employee name that does not exist in the db and then return a custom error", async () => {
        expect.assertions(3)

        try {
            const input = {
                employeeName: "Tábata Amaral",
                token: "token"
            }

            await employeeBusiness.deleteEmployee(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(404)
            expect(error.message).toBe("This employee has not been registered yet.")
        }
    })
    
    test("Should receive an employee who is a collaborator in a project and then return a custom error", async () => {
        expect.assertions(3)

        try {
            const input = {
                employeeName: "Tábata Santos",
                token: "token"
            }

            await employeeBusiness.deleteEmployee(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("You cannot delete an employee who is a collaborator in a project.")
        }
    })

    test("Should receive a valid input and not return a custom error", async () => {
        const input = {
            employeeName: "João Pedro Saraiva",
            token: "token"
        }

        const result = await employeeBusiness.deleteEmployee(input)
        expect(result).toBeUndefined()
    })
})