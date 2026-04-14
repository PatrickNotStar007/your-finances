import type { NextFunction, Request, Response } from 'express'
import { ExtendedError, RequestValidationError } from '../errors/common.errors'

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(err.message)

    if (err instanceof RequestValidationError)
        return res
            .status(err.status)
            .json({ message: err.message, errors: err.errors })

    if (err instanceof ExtendedError)
        return res.status(err.status).json({ message: err.message })

    return res.status(500).json({ message: 'Внутренняя ошибка сервера' })
}
