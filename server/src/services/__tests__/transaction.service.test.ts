import { NotFoundError } from '../../errors/transaction.errors'
import { prisma } from '../../utils/prisma.service'
import { transactionService } from '../transaction.service'

jest.mock('../../utils/prisma.service', () => ({
    prisma: {
        transaction: {
            findUnique: jest.fn(),
            findMany: jest.fn(),
        },
    },
}))

const mockPrismaFindMany = prisma.transaction.findMany as jest.Mock
const mockPrismaFindUnique = prisma.transaction.findUnique as jest.Mock

describe('TransactionService', () => {
    beforeEach(() => jest.clearAllMocks())

    describe('getAll', () => {
        it('должен применить фильтры по дате, если переданы startDate и endDate', async () => {
            const filterParams = {
                userId: 'user_id',
                startDate: '2024-01-01',
                endDate: '2025-01-01',
            }
            const mockTransactions = [
                { id: '1', amount: 100, createdAt: new Date('2024-06-06') },
                { id: '2', amount: 150, createdAt: new Date('2024-07-08') },
            ]
            mockPrismaFindMany.mockResolvedValue(mockTransactions)

            const result = await transactionService.getAll(filterParams)

            expect(mockPrismaFindMany).toHaveBeenCalledWith({
                where: {
                    userId: 'user_id',
                    createdAt: {
                        gte: new Date('2024-01-01'),
                        lte: new Date('2025-01-01'),
                    },
                },
                orderBy: { createdAt: 'desc' },
            })
            expect(result).toEqual(mockTransactions)
        })

        it('не должен применить фильтры по дате, если startDate и endDate не переданы', async () => {
            const filterParams = { userId: 'user_id' }
            mockPrismaFindMany.mockResolvedValue([])

            await transactionService.getAll(filterParams)

            expect(mockPrismaFindMany).toHaveBeenCalledWith({
                where: {
                    userId: 'user_id',
                },
                orderBy: { createdAt: 'desc' },
            })
        })
    })

    describe('getById', () => {
        it('должен вернуть транзакцию, если она найдена и принадлежит пользователю', async () => {
            const mockTransaction = {
                id: '1',
                userId: 'user_id',
                amount: 100,
            }
            mockPrismaFindUnique.mockResolvedValue(mockTransaction)

            const result = await transactionService.getById('user_id', '1')

            expect(mockPrismaFindUnique).toHaveBeenCalledWith({
                where: { userId: 'user_id', id: '1' },
            })
            expect(result).toEqual(mockTransaction)
        })

        it('должен кинуть ошибку NotFoundError, если транзакция не найдена', async () => {
            mockPrismaFindUnique.mockResolvedValue(null)

            await expect(
                transactionService.getById('user_id', '1')
            ).rejects.toThrow(NotFoundError)
        })
    })
})
