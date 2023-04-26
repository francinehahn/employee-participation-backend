import { UserBusiness } from "../../src/business/UserBusiness"
import { CustomError } from "../../src/error/CustomError"
import { AuthenticatorMock } from "../mocks/AuthenticatorMock"
import { HashGeneratorMock } from "../mocks/HashGeneratorMock"
import { UserDatabaseMock } from "../mocks/UserDatabaseMock"


const userBusiness = new UserBusiness(new UserDatabaseMock(), new HashGeneratorMock(), new AuthenticatorMock())

describe("Testing the signup endpoint", () => {
    test("Should receive an input with no user name and then return a custom error", async () => {
        expect.assertions(3)
        try {
            const input = {
                userName: "",
                email: "teste@teste.com",
                password: "12345678"
            }

            await userBusiness.signup(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Provide the user name.")
        }
    })

    test("Should receive an input with an invalid email and then return a custom error", async () => {
        expect.assertions(3)
        try {
            const input = {
                userName: "Fernanda Monteiro",
                email: "teste",
                password: "12345678"
            }

            await userBusiness.signup(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Invalid email.")
        }
    })

    test("Should receive an input with an invalid password and then return a custom error", async () => {
        expect.assertions(3)
        try {
            const input = {
                userName: "Fernanda Monteiro",
                email: "teste@teste.com",
                password: "12345"
            }

            await userBusiness.signup(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("The password must have at least 8 characters.")
        }
    })

    test("Should receive an invalid user name and then return a custom error", async () => {
        expect.assertions(3)
        try {
            const input = {
                userName: "Mar Sá",
                email: "mar.sa@gmail.com",
                password: "12345678"
            }

            await userBusiness.signup(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Provide the first name and the last name of the user with at least 7 characters.")
        }
    })

    test("Should receive a valid input and NOT return a custom error", async () => {
        const input = {
            userName: "Fernanda Monteiro",
            email: "fernanda.monteiro@gmail.com",
            password: "12345678"
        }

        const result = await userBusiness.signup(input)
        expect(result).toBeUndefined()
    })
})


describe("Testing the login endpoint", () => {
    test("Should not receive the password and then return a custom error", async () => {
        expect.assertions(3)

        try {
            const input = {
                email: "mariliapereira@gmail.com",
                password: ""
            }

            await userBusiness.login(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Provide the password.")
        }
    })

    test("Should receive an email not registered in the db and then return a custom error", async () => {
        expect.assertions(3)
        
        try {
            const input = {
                email: "mariliapereira@gmail",
                password: "12345678"
            }

            await userBusiness.login(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(404)
            expect(error.message).toBe("Email not found.")
        }
    })

    test("Should receive an incorrect password and return a custom error", async () => {
        expect.assertions(3)
        
        const input = {
            email: "fran_hahn@hotmail.com",
            password: "12345678910"
        }

        try {
            await userBusiness.login(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Incorrect password.")
        }
    })

    test("Should receive a valid input and then return a token", async () => {
        
        const input = {
            email: "fran_hahn@hotmail.com",
            password: "12345678"
        }

        const result = await userBusiness.login(input)

        expect(result).toBe("token")
    })
})


describe("Testing the getAccountInfo endpoint", () => {
    test("Should receive an invalid token and then return a custom error", async () => {
        expect.assertions(3)

        try {
            await userBusiness.getAccountInfo("incorrectToken")
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(401)
            expect(error.message).toBe("Unauthorized user.")
        }
    })

    test("Should receive a valid token and then return the result", async () => {
        const result = await userBusiness.getAccountInfo("token")
        expect(result).toEqual({"_id": "6431b333f7dc32460cb09429", "email": "fran_hahn@hotmail.com", "employees": [{"employee_name": "Tábata Santos", "status": "inactive"}, {"employee_name": "João Pedro Saraiva", "status": "active"}], "projects": [{"collaborators": [{"employee_name": "Maria Fontoura", "participation": 20}, {"employee_name": "Breno Fuchs", "participation": 18}, {"employee_name": "Ana Castro", "participation": 17}], "end_date": "03/04/2023", "project_name": "Labefood", "start_date": "10/12/2022"}], "user_name": "Francine Hahn"})
    })
})


describe("Testing the deleteAccount endpoint", () => {
    test("Should receive an invalid token and then return a custom error", async () => {
        expect.assertions(3)

        try {
            await userBusiness.deleteAccount("incorrectToken")
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(401)
            expect(error.message).toBe("Unauthorized user.")
        }
    })

    test("Should receive a valid token and then return the result", async () => {
        const result = await userBusiness.deleteAccount("token")
        expect(result).toBeUndefined()
    })
})