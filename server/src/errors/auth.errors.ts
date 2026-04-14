import { ExtendedError } from './common.errors'

export class UserAlreadyExistsError extends ExtendedError {
    constructor(email: string) {
        super(`Пользователь с почтой ${email} уже существует`, 409)
    }
}

export class InvalidCredentialError extends ExtendedError {
    constructor() {
        super('Неверный email или пароль', 401)
    }
}

export class UserNotFoundError extends ExtendedError {
    constructor() {
        super('Пользователь не найден', 404)
    }
}
