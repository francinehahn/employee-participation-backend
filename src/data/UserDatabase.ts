import { CustomError } from "../error/CustomError"
import { User } from "../model/User"
import { UserModel } from "../model/UserModel"
import { UserRepository } from "../model/UserRepository"


export class UserDatabase implements UserRepository {
    public signup = async (newUser: User): Promise<void> => {
        try {
            await UserModel.create(newUser)
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    public getUserByEmail = async (email: string): Promise<any> => {
        try {
            return await UserModel.findOne({email})
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }
}