import { CustomError } from "../error/CustomError"
import { User, outputGetUserByEmailDTO, outputUserInfoDTO } from "../model/User"
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

    public getUserByEmail = async (email: string): Promise<outputGetUserByEmailDTO | null> => {
        try {
            return await UserModel.findOne({email}, {employees: 0, projects: 0})
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }

    public getUserById = async (id: string): Promise<outputUserInfoDTO | null> => {
        try {
            return await UserModel.findOne({_id: id}, {password: 0})
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }
}