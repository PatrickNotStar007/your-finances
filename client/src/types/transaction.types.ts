export interface Transaction {
    amount: number
    type: 'income' | 'expense'
    category: string
    createdAt: Date
    comment?: string
    userId: string
}

export interface TransactionsFilter {
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

export interface CreateTransactionDto {
    amount: number
    type: 'income' | 'expense'
    category: string
    createdAt: Date
    comment?: ''
    userId: string
}

export interface UpdateTransactionDto extends Partial<CreateTransactionDto> {}
