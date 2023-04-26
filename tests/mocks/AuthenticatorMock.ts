import { Unauthorized } from "../../src/error/userErrors"
import { IAuthenticator } from "../../src/model/IAuthenticator"

export class AuthenticatorMock implements IAuthenticator {
    public generateToken = jest.fn(() => {
        return "token"
    })

    public getTokenData = jest.fn((token: string) => {
        if (token !== "token") {
            throw new Unauthorized()
        }
        
        return {id: "id"}
    })
}