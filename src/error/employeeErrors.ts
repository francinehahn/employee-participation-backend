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

export class InvalidSpacesEmployeeName extends CustomError {
    constructor () {
        super(422, "The employee name must not contain any spaces (all spaces must be replaced by '-'). Example: Maria-Santos")
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

export class NoEmployeeRegistered extends CustomError {
    constructor () {
        super(422, "No employees have been registered yet.")
    }
}

export class InvalidSearchTerm extends CustomError {
    constructor () {
        super(422, "The search term must be either active or inactive.")
    }
}

export class UnableToDeleteEmployee extends CustomError {
    constructor () {
        super(422, "You cannot delete an employee who is a collaborator in a project.")
    }
}

export class NoCollaborationsFound extends CustomError {
    constructor () {
        super(404, "The employee has not collaborated in any projects yet.")
    }
}