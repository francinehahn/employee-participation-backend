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


/*describe("Testing the editEmployeeStatus endpoint", () => {})


describe("Testing the getAllEmployees endpoint", () => {})


describe("Testing the getEmployeeInfo endpoint", () => {})


describe("Testing the deleteEmployee endpoint", () => {})
*/