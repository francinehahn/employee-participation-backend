import { User } from "./User"

export interface UserRepository {
    signup (newUser: User): Promise<void>
    getUserByEmail (email: string): Promise<any>
}