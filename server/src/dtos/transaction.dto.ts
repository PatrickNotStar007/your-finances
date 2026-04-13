export interface CreateTransactionDto {
    amount: number
    type: 'income' | 'expense'
    category: string
    comment?: string
    date?: Date
}
