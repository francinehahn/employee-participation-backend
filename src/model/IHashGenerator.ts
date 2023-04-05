export interface IHashGenerator {
    generateHash (plaintext: string): Promise<string>
    compareHash (plaintex: string, hashtext: string): Promise<boolean>
}