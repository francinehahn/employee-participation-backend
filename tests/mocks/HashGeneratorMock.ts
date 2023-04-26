import { IHashGenerator } from "../../src/model/IHashGenerator"

export class HashGeneratorMock implements IHashGenerator {
    public generateHash = jest.fn(async (plaintext: string) => {
        return "hash"
    }) 

    public compareHash = jest.fn(async (plaintext: string, hashText: string) => {
        return plaintext === hashText
    })
}