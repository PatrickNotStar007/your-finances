import { ExtendedError } from './common.errors'

export class NotFoundError extends ExtendedError {
    constructor() {
        super('Данные не найдены', 404)
    }
}
