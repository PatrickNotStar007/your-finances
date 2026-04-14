export interface TransactionFilterType {
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
