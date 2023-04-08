import { CustomError } from "./CustomError"


export class MissingProjectName extends CustomError {
    constructor () {
        super(422, "Provide the project name.")
    }
}

export class InvalidProjectName extends CustomError {
    constructor () {
        super(422, "The project name must have at least 3 characters.")
    }
}

export class ProjectNotFound extends CustomError {
    constructor () {
        super(404, "This project has not been registered yet.")
    }
}

export class MissingStartDate extends CustomError {
    constructor () {
        super(422, "Provide the start date in the dd/mm/aaaa format.")
    }
}

export class InvalidStartDate extends CustomError {
    constructor () {
        super(422, "Invalid start date.")
    }
}

export class MissingEndDate extends CustomError {
    constructor () {
        super(422, "Provide the end date in the dd/mm/aaaa format.")
    }
}

export class InvalidEndDate extends CustomError {
    constructor () {
        super(422, "Invalid end date.")
    }
}

export class InvalidDates extends CustomError {
    constructor () {
        super(422, "The end date of the project cannot be earlier than the start date.")
    }
}

export class DuplicateProject extends CustomError {
    constructor () {
        super(409, "Project already registered.")
    }
}

export class EmployeeNotFound extends CustomError {
    constructor () {
        super(404, "This employee has not been registered yet.")
    }
}

export class MissingParticipation extends CustomError {
    constructor () {
        super(422, "Provide the employee's participation rate.")
    }
}

export class InvalidParticipation extends CustomError {
    constructor () {
        super(422, "The participation rate must be higher than zero and lower than 100.")
    }
}

export class ParticipationRateExceeded extends CustomError {
    constructor () {
        super(422, "The participation of all employees together must be a maximum of 100%.")
    }
}

export class DuplicateCollaborator extends CustomError {
    constructor () {
        super(409, "This employee has already been assigned to this project.")
    }
}