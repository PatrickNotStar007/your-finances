import type { Result, ValidationError } from 'express-validator'

export class ExtendedError extends Error {
    public status: number

    constructor(message: string, status: number) {
        super(message)
        this.status = status
    }
}

export class RequestValidationError extends ExtendedError {
    public errors: ValidationError[]

    constructor(errors: Result<ValidationError>) {
        super('Ошибка валидации', 400)
        this.errors = errors.array()
    }
}
