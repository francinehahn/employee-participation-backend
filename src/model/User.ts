import { Employee } from "./Employee"
import { Project } from "./Project"

export class User {
    constructor (
        readonly user_name: string,
        readonly email: string,
        readonly password: string,
        readonly employees: {},
        readonly projects: {}
    ) {
        this.user_name = user_name
        this.email = email
        this.password = password
        this.employees = employees
    }
}

export interface inputSignupDTO {
    userName: string,
    email: string,
    password: string
}

export interface inputLoginDTO {
    email: string,
    password: string
}

export interface outputGetUserByEmailDTO {
    _id: string,
    user_name: string,
    email: string,
    password: string
}

export interface outputUserInfoDTO {
    _id: string,
    user_name: string,
    email: string,
    employees: Employee[],
    projects: Project[]
}