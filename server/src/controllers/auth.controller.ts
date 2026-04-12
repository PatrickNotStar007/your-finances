import type { Request, Response } from 'express'

import { authService } from '../services/auth.service'
import { validationResult } from 'express-validator'
import {
    InvalidCredentialError,
    UserAlreadyExistsError,
    UserNotFoundError,
    RequestValidationError,
} from '../errors/auth.errors'

export const authController = {
    async registration(req: Request, res: Response) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) throw new RequestValidationError(errors)

            const { name, email, password } = req.body
            const user = await authService.registration(email, name, password)

            return res.status(201).json(user)
        } catch (e) {
            console.error(e)

            if (e instanceof UserAlreadyExistsError)
                return res.status(e.status).json({ message: e.message })

            if (e instanceof RequestValidationError)
                return res
                    .status(e.status)
                    .json({ message: e.message, errors: e.errors })

            return res
                .status(500)
                .json({ message: 'Внутренняя ошибка сервера' })
        }
    },

    async login(req: Request, res: Response) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                throw new RequestValidationError(errors)
            }

            const { email, password } = req.body
            const token = await authService.login(email, password)

            return res.json({ token })
        } catch (e) {
            console.error(e)

            if (e instanceof RequestValidationError)
                return res
                    .status(e.status)
                    .json({ message: e.message, errors: e.errors })

            if (
                e instanceof InvalidCredentialError ||
                e instanceof UserNotFoundError
            )
                return res.status(e.status).json({ message: e.message })

            return res
                .status(500)
                .json({ message: 'Внутренняя ошибка сервера' })
        }
    },
}
