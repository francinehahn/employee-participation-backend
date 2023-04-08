import { User, outputGetUserByEmailDTO, outputUserInfoDTO } from "../User"

export interface UserRepository {
    signup (newUser: User): Promise<void>
    getUserByEmail (email: string): Promise<outputGetUserByEmailDTO | null>
    getUserById (id: string): Promise<outputUserInfoDTO | null>
    deleteAccount (id: string): Promise<void>
}