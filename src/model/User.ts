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