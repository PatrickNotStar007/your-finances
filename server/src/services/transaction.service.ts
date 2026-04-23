import { CreateTransactionDto } from '../dtos/transaction.dto'
import { NotFoundError } from '../errors/transaction.errors'
import {
    TransactionUpdateInput,
    TransactionWhereInput,
} from '../generated/prisma/models'
import { TransactionFilterType } from '../types/transaction.types'
import { validateDateFormat, validateDateRange } from '../utils/helpers'
import { prisma } from '../utils/prisma.service'

export const transactionService = {
    async create(userId: string, dto: CreateTransactionDto) {
        return await prisma.transaction.create({
            data: {
                amount: dto.amount,
                category: dto.category,
                type: dto.type,
                comment: dto.comment,
                createdAt: dto.createdAt,
                userId,
            },
        })
    },

    async getAll(filterParams: TransactionFilterType) {
        const userId = filterParams.userId
        const where: TransactionWhereInput = { userId }

        if (filterParams.type) where.type = filterParams.type
        if (filterParams.category) where.category = filterParams.category
        if (filterParams.startDate || filterParams.endDate) {
            const startDate = filterParams.startDate
            const endDate = filterParams.endDate

            validateDateFormat(startDate, endDate)
            validateDateRange(startDate, endDate)

            where.createdAt = {}

            if (startDate) where.createdAt.gte = new Date(startDate)
            if (endDate) where.createdAt.lte = new Date(endDate)
        }

        return await prisma.transaction.findMany({
            where,
            orderBy: { createdAt: 'desc' },
        })
    },

    async getById(userId: string, transactionId: string) {
        const transaction = await prisma.transaction.findUnique({
            where: { id: transactionId, userId },
        })

        if (!transaction) throw new NotFoundError()

        return transaction
    },

    async delete(userId: string, transactionId: string) {
        await this.getById(userId, transactionId)

        return await prisma.transaction.delete({
            where: { id: transactionId, userId },
        })
    },

    async update(
        userId: string,
        transactionId: string,
        data: TransactionUpdateInput
    ) {
        await this.getById(userId, transactionId)

        return await prisma.transaction.update({
            where: { id: transactionId, userId },
            data,
        })
    },
}
