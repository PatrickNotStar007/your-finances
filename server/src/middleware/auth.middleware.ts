import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { ENV } from '../config/env'

export interface AuthRequest extends Request {
    user?: {
        name: string
        id: string
        iat?: number
        exp?: number
    }
}

export const authMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {
        const token = req.headers.authorization?.split(' ')[1]

        if (!token) {
            return res
                .status(403)
                .json({ message: 'Пользователь не авторизован' })
        }

        const secret = ENV.SECRET_JWT

        if (!secret) {
            throw new Error('SECRET_JWT не определен в переменных окружения')
        }

        const decodedData = jwt.verify(token, secret) as {
            name: string
            id: string
            iat?: number
            exp?: number
        }

        req.user = decodedData
        return next()
    } catch (e) {
        console.log(e)
        return res.status(403).json({ message: 'Пользователь не авторизован' })
    }
}
