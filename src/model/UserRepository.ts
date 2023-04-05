import { User, outputGetUserBy } from "./User"

export interface UserRepository {
    signup (newUser: User): Promise<void>
    getUserByEmail (email: string): Promise<outputGetUserBy | null>
    getUserById (id: string): Promise<outputGetUserBy | null>
}