import { ExtendedError } from './common.errors'

export class NotFoundError extends ExtendedError {
    constructor() {
        super('Данные не найдены', 404)
    }
}

export class DateFormatError extends ExtendedError {
    constructor() {
        super('Неверный формат даты', 400)
    }
}

export class DateRangeError extends ExtendedError {
    constructor() {
        super('startDate не может быть больше endDate', 400)
    }
}
