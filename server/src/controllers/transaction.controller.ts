import type { Response } from 'express'
import type { AuthRequest } from '../middleware/auth.middleware'
import { validationResult } from 'express-validator'
import {
    RequestValidationError,
    UnauthorizedError,
} from '../errors/common.errors'
import {
    DateFormatError,
    DateRangeError,
    NotFoundError,
} from '../errors/transaction.errors'
import { filterType, transactionService } from '../services/transaction.service'
import {
    CreateTransactionDto,
    UpdateTransactionDto,
} from '../dtos/transaction.dto'
import { TransactionWhereInput } from '../generated/prisma/models'

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
            const dto: CreateTransactionDto = req.body
            const transaction = await transactionService.create(userId, dto)

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
            const filter: filterType = {
                userId,
                type: (req.query.type as 'income' | 'expense') || undefined,
                category: (req.query.category as string) || undefined,
                startDate: (req.query.startDate as string) || undefined,
                endDate: (req.query.endDate as string) || undefined,
            }

            if (filter.startDate && isNaN(new Date(filter.startDate).getTime()))
                throw new DateFormatError()

            if (filter.endDate && isNaN(new Date(filter.endDate).getTime()))
                throw new DateFormatError()

            if (
                filter.startDate &&
                filter.endDate &&
                new Date(filter.startDate) > new Date(filter.endDate)
            )
                throw new DateRangeError()

            const transactions = await transactionService.getAll(filter)

            return res.status(200).json(transactions)
        } catch (e) {
            console.error(e)

            if (
                e instanceof UnauthorizedError ||
                e instanceof DateFormatError ||
                e instanceof DateRangeError
            )
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
            const transaction = await transactionService.getById(
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

    async delete(req: AuthRequest, res: Response) {
        try {
            const userId = getUserId(req)
            const transactionId = req.params.id as string
            const transaction = await transactionService.delete(
                userId,
                transactionId
            )

            return res.status(204).json(transaction)
        } catch (e) {
            console.error(e)

            if (e instanceof NotFoundError)
                return res.status(e.status).json({ message: e.message })

            return res
                .status(500)
                .json({ message: 'Внутренняя ошибка сервера' })
        }
    },

    async update(req: AuthRequest, res: Response) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) throw new RequestValidationError(errors)

            const userId = getUserId(req)
            const transactionId = req.params.id as string
            const updateData: UpdateTransactionDto = req.body

            if (Object.keys(updateData).length === 0)
                return res
                    .status(400)
                    .json({ message: 'Нет данных для обновления' })

            const transaction = await transactionService.update(
                userId,
                transactionId,
                updateData
            )

            return res.status(200).json(transaction)
        } catch (e) {
            console.error(e)

            if (e instanceof RequestValidationError)
                return res
                    .status(e.status)
                    .json({ message: e.message, errors: e.errors })

            if (e instanceof NotFoundError)
                return res.status(e.status).json({ message: e.message })

            return res
                .status(500)
                .json({ message: 'Внутренняя ошибка сервера' })
        }
    },
}
