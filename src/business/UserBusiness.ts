import { CustomError } from "../error/CustomError"
import { EmailNotFound, IncorrectPassword, InvalidEmail, InvalidPassword, InvalidUserName, MissingEmail, MissingPassword, MissingUserName } from "../error/userErrors"
import { IAuthenticator } from "../model/IAuthenticator"
import { IHashGenerator } from "../model/IHashGenerator"
import { User, inputLoginDTO, inputSignupDTO } from "../model/User"
import { UserRepository } from "../model/UserRepository"

export class UserBusiness {
    constructor (
        private userDatabase: UserRepository,
        private hashGenerator: IHashGenerator,
        private authenticator: IAuthenticator
    ) {}

    public signup = async (input: inputSignupDTO): Promise<void> => {
        try {
            if (!input.userName) {
                throw new MissingUserName()
            }
            if (!input.email) {
                throw new MissingEmail()
            }
            if (!input.password) {
                throw new MissingPassword()
            }
            if (input.userName.length < 10 || !input.userName.includes(" ")) {
                throw new InvalidUserName()
            }
            if (!input.email.includes("@")) {
                throw new InvalidEmail()
            }
            if (input.password.length < 8) {
                throw new InvalidPassword()
            }

            const hash = await this.hashGenerator.generateHash(input.password)
            const newUser = new User(input.userName, input.email, hash, [], [])
            await this.userDatabase.signup(newUser)

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    public login = async (input: inputLoginDTO): Promise<string> => {
        try {
            if (!input.email) {
                throw new MissingEmail()
            }
            if (!input.email.includes("@")) {
                throw new InvalidEmail()
            }
            if (!input.password) {
                throw new MissingPassword()
            }
            if (input.password.length < 8) {
                throw new InvalidPassword()
            }

            const findUser = await this.userDatabase.getUserByEmail(input.email)
            if (!findUser) {
                throw new EmailNotFound()
            }

            const correctPassword = await this.hashGenerator.compareHash(input.password, findUser.password)
            if (!correctPassword) {
                throw new IncorrectPassword()
            }

            const token = await this.authenticator.generateToken(findUser._id)
            return token

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}