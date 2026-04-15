import type { NextFunction, Response } from 'express'
import type { AuthRequest } from '../middleware/auth.middleware'
import { validationResult } from 'express-validator'
import { RequestValidationError } from '../errors/common.errors'
import { transactionService } from '../services/transaction.service'
import {
    CreateTransactionDto,
    UpdateTransactionDto,
} from '../dtos/transaction.dto'
import { TransactionFilterType } from '../types/transaction.types'
import { getUserId } from '../utils/helpers'

export const transactionController = {
    async create(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) throw new RequestValidationError(errors)

            const userId = getUserId(req)
            const dto: CreateTransactionDto = req.body
            const transaction = await transactionService.create(userId, dto)

            return res.status(201).json(transaction)
        } catch (e) {
            next(e)
        }
    },

    async getAll(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const userId = getUserId(req)
            const filter: TransactionFilterType = {
                userId,
                type: (req.query.type as 'income' | 'expense') || undefined,
                category: (req.query.category as string) || undefined,
                startDate: (req.query.startDate as string) || undefined,
                endDate: (req.query.endDate as string) || undefined,
            }

            const transactions = await transactionService.getAll(filter)

            return res.status(200).json(transactions)
        } catch (e) {
            next(e)
        }
    },

    async getById(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const userId = getUserId(req)
            const transactionId = req.params.id as string
            const transaction = await transactionService.getById(
                userId,
                transactionId
            )

            return res.status(200).json(transaction)
        } catch (e) {
            next(e)
        }
    },

    async delete(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const userId = getUserId(req)
            const transactionId = req.params.id as string
            const transaction = await transactionService.delete(
                userId,
                transactionId
            )

            return res.status(204).json(transaction)
        } catch (e) {
            next(e)
        }
    },

    async update(req: AuthRequest, res: Response, next: NextFunction) {
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
            next(e)
        }
    },
}
