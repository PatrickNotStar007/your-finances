import type { Response } from 'express'
import type { AuthRequest } from '../middleware/auth.middleware'
import { TransactionService } from '../services/transaction.service'
import { validationResult } from 'express-validator'
import {
    RequestValidationError,
    UnauthorizedError,
} from '../errors/common.errors'
import { NotFoundError } from '../errors/transaction.errors'

const getUserId = (req: AuthRequest) => {
    if (!req.user) throw new UnauthorizedError()
    return req.user.id
}

export const transactionController = {
    async create(req: AuthRequest, res: Response) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) throw new RequestValidationError(errors)

            const userId = getUserId(req)
            const dto = req.body
            const transaction = await TransactionService.create(userId, dto)

            return res.status(201).json(transaction)
        } catch (e) {
            console.error(e)

            if (e instanceof RequestValidationError)
                return res
                    .status(e.status)
                    .json({ message: e.message, errors: e.errors })

            if (e instanceof UnauthorizedError)
                return res.status(e.status).json({ message: e.message })

            return res
                .status(500)
                .json({ message: 'Внутренняя ошибка сервера' })
        }
    },

    async getAll(req: AuthRequest, res: Response) {
        try {
            const userId = getUserId(req)
            const transactions = await TransactionService.getAll(userId)

            return res.status(200).json(transactions)
        } catch (e) {
            console.error(e)

            if (e instanceof UnauthorizedError)
                return res.status(e.status).json({ message: e.message })

            return res
                .status(500)
                .json({ message: 'Внутренняя ошибка сервера' })
        }
    },

    async getById(req: AuthRequest, res: Response) {
        try {
            const userId = getUserId(req)
            const transactionId = req.params.id as string
            const transaction = await TransactionService.getById(
                userId,
                transactionId
            )

            return res.status(200).json(transaction)
        } catch (e) {
            console.error(e)

            if (e instanceof NotFoundError)
                return res.status(e.status).json({ message: e.message })

            return res
                .status(500)
                .json({ message: 'Внутренняя ошибка сервера' })
        }
    },
}
