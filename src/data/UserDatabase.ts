import { CustomError } from "../error/CustomError"
import { User, outputGetUserBy } from "../model/User"
import { UserModel } from "../model/UserModel"
import { UserRepository } from "../model/repositories/UserRepository"


export class UserDatabase implements UserRepository {
    public signup = async (newUser: User): Promise<void> => {
        try {
            await UserModel.create(newUser)
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    public getUserByEmail = async (email: string): Promise<outputGetUserBy | null> => {
        try {
            return await UserModel.findOne({email})
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }

    public getUserById = async (id: string): Promise<outputGetUserBy | null> => {
        try {
            return await UserModel.findOne({_id: id})
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }
}