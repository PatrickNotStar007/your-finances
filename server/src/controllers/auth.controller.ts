import type { Request, Response } from 'express'

import { authService } from '../services/auth.service'
import { validationResult } from 'express-validator'

export const authController = {
    async registration(req: Request, res: Response) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: 'Ошибка при регистрации',
                    errors,
                })
            }

            const { name, email, password } = req.body

            const user = await authService.registration(email, name, password)
            res.status(200).json(user)
        } catch (e) {
            console.error(e)
            res.status(400).json({ message: 'Registration error' })
        }
    },

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body

            const token = await authService.login(email, password)

            return res.json({ token })
        } catch (e) {
            console.error(e)
            res.status(400).json({ message: 'Login error' })
        }
    },
}
