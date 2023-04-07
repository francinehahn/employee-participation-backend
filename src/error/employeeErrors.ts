import { CustomError } from "./CustomError"

export class MissingEmployeeName extends CustomError {
    constructor () {
        super(422, "Provide the employee's full name.")
    }
}

export class InvalidEmployeeName extends CustomError {
    constructor () {
        super(422, "The employee's full name must have at least 8 characters.")
    }
}

export class MissingStatus extends CustomError {
    constructor () {
        super(422, "Provide the employee status.")
    }
}

export class InvalidStatus extends CustomError {
    constructor () {
        super(422, "The employee status must be either active or inactive.")
    }
}

export class DuplicateEmployee extends CustomError {
    constructor () {
        super(409, "Employee already registered.")
    }
}