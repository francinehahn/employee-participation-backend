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