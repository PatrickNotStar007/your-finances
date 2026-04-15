import { DateFormatError, DateRangeError } from '../errors/transaction.errors'
import { prisma } from '../utils/prisma.service'

export const analyticsService = {
    async getSummary(
        userId: string,
        startDateStr?: string,
        endDateStr?: string
    ) {
        if (startDateStr && isNaN(new Date(startDateStr).getTime()))
            throw new DateFormatError()
        if (endDateStr && isNaN(new Date(endDateStr).getTime()))
            throw new DateFormatError()

        let startDate = new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            1
        )
        let endDate = new Date()

        if (startDateStr) startDate = new Date(startDateStr)
        if (endDateStr) endDate = new Date(endDateStr)

        if (startDate && endDate && startDate > endDate)
            throw new DateRangeError()

        const income = await prisma.transaction.aggregate({
            where: {
                userId,
                type: 'income',
                createdAt: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            _sum: { amount: true },
        })
        const expense = await prisma.transaction.aggregate({
            where: {
                userId,
                type: 'expense',
                createdAt: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            _sum: { amount: true },
        })

        const groupByRaw = await prisma.transaction.groupBy({
            where: {
                userId,
                type: 'expense',
                createdAt: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            by: ['category'],
            _sum: { amount: true },
        })

        const groupBy: Record<string, number> = {}
        for (const group of groupByRaw) {
            if (group._sum.amount) groupBy[group.category] = group._sum.amount
        }

        return {
            totalIncome: income._sum.amount ?? 0,
            totalExpense: expense._sum.amount ?? 0,
            balance: (income._sum.amount ?? 0) - (expense._sum.amount ?? 0),
            groupBy,
        }
    },
}
