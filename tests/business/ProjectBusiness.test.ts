import { ProjectBusiness } from "../../src/business/ProjectBusiness";
import { CustomError } from "../../src/error/CustomError";
import { AuthenticatorMock } from "../mocks/AuthenticatorMock";
import { ProjectDatabaseMock } from "../mocks/ProjectDatabaseMock";
import { UserDatabaseMock } from "../mocks/UserDatabaseMock";


const projectBusiness = new ProjectBusiness(new ProjectDatabaseMock(), new UserDatabaseMock(), new AuthenticatorMock())

describe("Testing the registerProject endpoint", () => {
    test("Should not receive the project name and then return a custom error", async () => {
        expect.assertions(3)

        try {
            const input = {
                projectName: "",
                startDate: "05/04/2022",
                endDate: "30-10-2022",
                token: "token"
            }

            await projectBusiness.registerProject(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Provide the project name.")
        }
    })

    test("Should not receive the start date and then return a custom error", async () => {
        expect.assertions(3)

        try {
            const input = {
                projectName: "LAMA",
                startDate: "",
                endDate: "30-10-2022",
                token: "token"
            }

            await projectBusiness.registerProject(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Provide the start date in the dd/mm/aaaa format.")
        }
    })

    test("Should not receive the end date and then return a custom error", async () => {
        expect.assertions(3)

        try {
            const input = {
                projectName: "LAMA",
                startDate: "05/04/2022",
                endDate: "",
                token: "token"
            }

            await projectBusiness.registerProject(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Provide the end date in the dd/mm/aaaa format.")
        }
    })

    test("Should not receive the token and then return a custom error", async () => {
        expect.assertions(3)

        try {
            const input = {
                projectName: "LAMA",
                startDate: "05/04/2022",
                endDate: "30/12/2022",
                token: ""
            }

            await projectBusiness.registerProject(input)
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
                projectName: "Cookenu",
                startDate: "05/05/2022",
                endDate: "30/10/2022",
                token: "invalidToken"
            }

            await projectBusiness.registerProject(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(401)
            expect(error.message).toBe("Unauthorized user.")
        }
    })

    test("Should receive an invalid project name and then return a custom error", async () => {
        expect.assertions(3)

        try {
            const input = {
                projectName: "LA",
                startDate: "05/05/2022",
                endDate: "30/10/2022",
                token: "token"
            }

            await projectBusiness.registerProject(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("The project name must have at least 3 characters.")
        }
    })

    test("Should receive an invalid start and end dates and then return a custom error", async () => {
        expect.assertions(3)

        try {
            const input = {
                projectName: "LAMA",
                startDate: "05/04/2023",
                endDate: "30/10/2022",
                token: "token"
            }

            await projectBusiness.registerProject(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("The end date of the project cannot be earlier than the start date.")
        }
    })

    test("Should receive an invalid start date and then return a custom error", async () => {
        expect.assertions(3)

        try {
            const input = {
                projectName: "LAMA",
                startDate: "05-04-2022",
                endDate: "30/10/2022",
                token: "token"
            }

            await projectBusiness.registerProject(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Invalid start date.")
        }
    })

    test("Should receive an invalid end date and then return a custom error", async () => {
        expect.assertions(3)

        try {
            const input = {
                projectName: "LAMA",
                startDate: "05/04/2022",
                endDate: "30-10-2022",
                token: "token"
            }

            await projectBusiness.registerProject(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Invalid end date.")
        }
    })

    test("Should receive a project name that has already been registered and then return a custom error", async () => {
        expect.assertions(3)

        try {
            const input = {
                projectName: "Labefood",
                startDate: "05/04/2022",
                endDate: "30/10/2022",
                token: "token"
            }

            await projectBusiness.registerProject(input)
        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(409)
            expect(error.message).toBe("Project already registered.")
        }
    })

    test("Should receive a valid input and not return a custom error", async () => {
        const input = {
            projectName: "Pokedex",
            startDate: "05/04/2022",
            endDate: "30/10/2022",
            token: "token"
        }

        const result = await projectBusiness.registerProject(input)
        expect(result).toBeUndefined()
    })
})


describe("Testing the assignCollaboratorToAproject endpoint", () => {
    test("Should not receive the token and then return a custom error", async () => {
        expect.assertions(3)

        try {
            const input = {
                projectName: "Labefood",
                employeeName: "Tábata Santos",
                participation: 10,
                token: ""
            }

            await projectBusiness.assignCollaboratorToAproject(input)
        } catch(error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Provide the token.")
        }
    })

    test("Should receive an invalid token and then return a custom error", async () => {
        expect.assertions(3)

        try {
            const input = {
                projectName: "Labefood",
                employeeName: "Tábata Santos",
                participation: 10,
                token: "invalidToken"
            }

            await projectBusiness.assignCollaboratorToAproject(input)
        } catch(error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(401)
            expect(error.message).toBe("Unauthorized user.")
        }
    })

    test("Should not receive the project name and then return a custom error", async () => {
        expect.assertions(3)

        try {
            const input = {
                projectName: "",
                employeeName: "Tábata Santos",
                participation: 10,
                token: "token"
            }

            await projectBusiness.assignCollaboratorToAproject(input)
        } catch(error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Provide the project name.")
        }
    })

    test("Should receive an invalid project name and then return a custom error", async () => {
        expect.assertions(3)

        try {
            const input = {
                projectName: "LAMA",
                employeeName: "Tábata Santos",
                participation: 10,
                token: "token"
            }

            await projectBusiness.assignCollaboratorToAproject(input)
        } catch(error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(404)
            expect(error.message).toBe("This project has not been registered yet.")
        }
    })

    test("Should not receive the employee name and then return a custom error", async () => {
        expect.assertions(3)

        try {
            const input = {
                projectName: "Labefood",
                employeeName: "",
                participation: 10,
                token: "token"
            }

            await projectBusiness.assignCollaboratorToAproject(input)
        } catch(error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Provide the employee's full name.")
        }
    })

    test("Should receive an invalid employee name and then return a custom error", async () => {
        expect.assertions(3)

        try {
            const input = {
                projectName: "Labefood",
                employeeName: "Laura Santos",
                participation: 10,
                token: "token"
            }

            await projectBusiness.assignCollaboratorToAproject(input)
        } catch(error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(404)
            expect(error.message).toBe("This employee has not been registered yet.")
        }
    })

    test("Should receive an employee who has already been assigned to the project and then return a custom error", async () => {
        expect.assertions(3)

        try {
            const input = {
                projectName: "Labefood",
                employeeName: "Tábata Santos",
                participation: 20,
                token: "token"
            }

            await projectBusiness.assignCollaboratorToAproject(input)
        } catch(error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(409)
            expect(error.message).toBe("This employee has already been assigned to this project.")
        }
    })

    test("Should not receive the participation rate and then return a custom error", async () => {
        expect.assertions(3)

        try {
            const input = {
                projectName: "Labefood",
                employeeName: "João Pedro Saraiva",
                participation: 0,
                token: "token"
            }

            await projectBusiness.assignCollaboratorToAproject(input)
        } catch(error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Provide the employee's participation rate.")
        }
    })

    test("Should receive an invalid participation rate and then return a custom error", async () => {
        expect.assertions(3)

        try {
            const input = {
                projectName: "Labefood",
                employeeName: "João Pedro Saraiva",
                participation: 90,
                token: "token"
            }

            await projectBusiness.assignCollaboratorToAproject(input)
        } catch(error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("The participation of all employees together must be a maximum of 100%.")
        }
    })

    test("Should receive a valid input and not return a custom error", async () => {
        const input = {
            projectName: "Labefood",
            employeeName: "João Pedro Saraiva",
            participation: 10,
            token: "token"
        }

        const result = await projectBusiness.assignCollaboratorToAproject(input)
        expect(result).toBeUndefined()
    })
})


describe("Testing the editCollaboratorParticipation endpoint", () => {
    test("Should not receive the token and then return a custom error", async () => {
        try {
            const input = {
                projectName: "Labefood",
                employeeName: "Tábata Santos",
                participation: 25,
                token: ""
            }

            await projectBusiness.editCollaboratorParticipation(input)

        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Provide the token.")
        }
    })

    test("Should receive an invalid token and then return a custom error", async () => {
        try {
            const input = {
                projectName: "Labefood",
                employeeName: "Tábata Santos",
                participation: 25,
                token: "invalidToken"
            }

            await projectBusiness.editCollaboratorParticipation(input)

        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(401)
            expect(error.message).toBe("Unauthorized user.")
        }
    })

    test("Should not receive the project name and then return a custom error", async () => {
        try {
            const input = {
                projectName: "",
                employeeName: "Tábata Santos",
                participation: 25,
                token: "token"
            }

            await projectBusiness.editCollaboratorParticipation(input)

        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Provide the project name.")
        }
    })

    test("Should receive an invalid project name and then return a custom error", async () => {
        try {
            const input = {
                projectName: "LAMA",
                employeeName: "Tábata Santos",
                participation: 25,
                token: "token"
            }

            await projectBusiness.editCollaboratorParticipation(input)

        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(404)
            expect(error.message).toBe("This project has not been registered yet.")
        }
    })

    test("Should not receive the employee name and then return a custom error", async () => {
        try {
            const input = {
                projectName: "Labefood",
                employeeName: "",
                participation: 25,
                token: "token"
            }

            await projectBusiness.editCollaboratorParticipation(input)

        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Provide the employee's full name.")
        }
    })

    test("Should receive an invalid employee name and then return a custom error", async () => {
        try {
            const input = {
                projectName: "Labefood",
                employeeName: "Pedro Lavras",
                participation: 25,
                token: "token"
            }

            await projectBusiness.editCollaboratorParticipation(input)

        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(404)
            expect(error.message).toBe("This employee has not been registered yet.")
        }
    })

    test("Should not receive the participation rate and then return a custom error", async () => {
        try {
            const input = {
                projectName: "Labefood",
                employeeName: "Tábata Santos",
                participation: 0,
                token: "token"
            }

            await projectBusiness.editCollaboratorParticipation(input)

        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("Provide the employee's participation rate.")
        }
    })

    test("Should receive an invalid participation rate and then return a custom error", async () => {
        try {
            const input = {
                projectName: "Labefood",
                employeeName: "Tábata Santos",
                participation: 101,
                token: "token"
            }

            await projectBusiness.editCollaboratorParticipation(input)

        } catch (error: any) {
            expect(error).toBeInstanceOf(CustomError)
            expect(error.statusCode).toBe(422)
            expect(error.message).toBe("The participation rate must be higher than zero and lower than 100.")
        }
    })

    test("Should receive a valid input and not return a custom error", async () => {
        const input = {
            projectName: "Labefood",
            employeeName: "Tábata Santos",
            participation: 30,
            token: "token"
        }

        const result = await projectBusiness.editCollaboratorParticipation(input)
        expect(result).toBeUndefined()
    })
})


/*describe("Testing the getAverageParticipation endpoint", () => {}


describe("Testing the editProjectInfo endpoint", () => {}


describe("Testing the deleteProject endpoint", () => {}


describe("Testing the deleteCollaborator endpoint", () => {})*/