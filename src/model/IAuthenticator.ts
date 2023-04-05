import { AuthenticationData } from "./AuthenticationData"

export interface IAuthenticator {
    generateToken ({id}: AuthenticationData): string
    getTokenData (token: string): AuthenticationData
}