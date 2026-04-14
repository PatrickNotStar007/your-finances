import { CreateTransactionDto } from '../dtos/transaction.dto'
import { NotFoundError } from '../errors/transaction.errors'
import {
    TransactionUpdateInput,
    TransactionWhereInput,
} from '../generated/prisma/models'
import { prisma } from '../utils/prisma.service'

export interface filterType {
    userId: string
    type?: 'income' | 'expense'
    category?: string
    startDate?: string
    endDate?: string
    createdAt?: {
        gte: Date
        lte: Date
    }
}

export const transactionService = {
    async create(userId: string, dto: CreateTransactionDto) {
        return await prisma.transaction.create({
            data: {
                amount: dto.amount,
                category: dto.category,
                type: dto.type,
                comment: dto.comment,
                createdAt: dto.date,
                userId,
            },
        })
    },

    async getAll(filterParams: filterType) {
        const userId = filterParams.userId
        const where: TransactionWhereInput = { userId }

        if (filterParams.type) where.type = filterParams.type
        if (filterParams.category) where.category = filterParams.category
        if (filterParams.startDate || filterParams.endDate) {
            where.createdAt = {}

            if (filterParams.startDate)
                where.createdAt.gte = new Date(filterParams.startDate)
            if (filterParams.endDate)
                where.createdAt.lte = new Date(filterParams.endDate)
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
