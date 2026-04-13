import { CreateTransactionDto } from '../dtos/transaction.dto'
import { NotFoundError } from '../errors/transaction.errors'
import {
    TransactionCreateInput,
    TransactionUpdateInput,
} from '../generated/prisma/models'
import { prisma } from '../utils/prisma.service'

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

    async getAll(userId: string) {
        return await prisma.transaction.findMany({
            where: { userId },
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
