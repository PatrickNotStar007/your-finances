import type { Result, ValidationError } from 'express-validator'

class AuthError extends Error {
    public status: number

    constructor(message: string, status: number) {
        super(message)
        this.status = status
    }
}

export class UserAlreadyExistsError extends AuthError {
    constructor(email: string) {
        super(`Пользователь с почтой ${email} уже существует`, 409)
    }
}

export class InvalidCredentialError extends AuthError {
    constructor() {
        super('Неверный email или пароль', 401)
    }
}

export class UserNotFoundError extends AuthError {
    constructor() {
        super('Пользователь не найден', 404)
    }
}

export class RequestValidationError extends AuthError {
    public errors: ValidationError[]

    constructor(errors: Result<ValidationError>) {
        super('Ошибка валидации', 400)
        this.errors = errors.array()
    }
}
