import type { NextFunction, Request, Response } from 'express'

import { authService } from '../services/auth.service'
import { validationResult } from 'express-validator'

import { RequestValidationError } from '../errors/common.errors'

export const authController = {
    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) throw new RequestValidationError(errors)

            const { name, email, password } = req.body
            const user = await authService.registration(email, name, password)

            return res.status(201).json(user)
        } catch (e) {
            next(e)
        }
    },

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                throw new RequestValidationError(errors)
            }

            const { email, password } = req.body
            const user = await authService.login(email, password)

            return res.json(user)
        } catch (e) {
            next(e)
        }
    },
}
