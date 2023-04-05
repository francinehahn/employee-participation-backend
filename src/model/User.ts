import { Employee } from "./Employee"
import { Project } from "./Project"

export class User {
    constructor (
        private user_name: string,
        private email: string,
        private password: string,
        private employees: [],
        private projects: []
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

export interface outputGetUserBy {
    _id: string,
    user_name: string,
    email: string,
    password: string,
    employees: Employee[],
    projects: Project[]
}

export interface outputUserInfo {
    _id: string,
    user_name: string,
    email: string,
    employees: Employee[],
    projects: Project[]
}