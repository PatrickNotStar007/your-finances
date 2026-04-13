import { CreateTransactionDto } from '../dtos/transaction.dto'
import { prisma } from '../utils/prisma.service'

export const TransactionService = {
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
}
