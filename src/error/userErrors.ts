import { CustomError } from "./CustomError";

export class Unauthorized extends CustomError {
    constructor () {
        super(401, "Unauthorized user.")
    }
}

export class MissingToken extends CustomError {
    constructor () {
        super(422, "Provide the token.")
    }
}

export class MissingUserName extends CustomError {
    constructor () {
        super(422, "Provide the user name.")
    }
}

export class MissingEmail extends CustomError {
    constructor () {
        super(422, "Provide the email.")
    }
}

export class MissingPassword extends CustomError {
    constructor () {
        super(422, "Provide the password.")
    }
}

export class InvalidPassword extends CustomError {
    constructor () {
        super(422, "The password must have at least 6 characters.")
    }
}

export class IncorrectPassword extends CustomError {
    constructor () {
        super(422, "Incorrect password.")
    }
}

export class InvalidEmail extends CustomError {
    constructor () {
        super(422, "Invalid email.")
    }
}

export class DuplicateEmail extends CustomError {
    constructor () {
        super(422, "Email already in use.")
    }
}

export class EmailNotFound extends CustomError {
    constructor () {
        super(404, "Email not found.")
    }
}