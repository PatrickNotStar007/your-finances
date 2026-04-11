import { Prisma, Transaction } from '../generated/prisma/client'
import { prisma } from '../utils/prisma.service'

export const transactionController = {
    async create(data: Transaction) {
        return await prisma.transaction.create({ data })
    },

    async getAll(userId: string) {
        return await prisma.transaction.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        })
    },

    async getById(id: string, userId: string) {
        try {
            return await prisma.transaction.findUnique({
                where: { id, userId },
            })
        } catch (e) {
            throw new Error('Транзакция не найдена')
        }
    },

    async update(
        id: string,
        userId: string,
        data: Prisma.TransactionUpdateInput
    ) {
        try {
            return await prisma.transaction.update({
                where: { id, userId },
                data,
            })
        } catch (e) {
            throw new Error('Транзакция не найдена')
        }
    },

    async delete(id: string, userId: string) {
        try {
            return await prisma.transaction.delete({ where: { id, userId } })
        } catch (e) {
            throw new Error('Транзакция не найдена')
        }
    },
}
