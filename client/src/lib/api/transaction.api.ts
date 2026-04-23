import type {
    Transaction,
    TransactionsFilter,
    UpdateTransactionDto,
} from '../../types/transaction.types'
import { api } from '../axios'

export const getTransactions = async (
    filterParams?: TransactionsFilter
): Promise<Transaction[]> => {
    const { data } = await api.get<Transaction[]>('/transactions', {
        params: filterParams,
    })
    return data
}

export const getTransactionById = async (id: string): Promise<Transaction> => {
    const { data } = await api.get<Transaction>(`/transactions/${id}`)
    return data
}

export const createTransaction = async (
    transactionData: Transaction
): Promise<Transaction> => {
    const { data } = await api.post<Transaction>(
        '/transactions',
        transactionData
    )
    return data
}

export const updateTransaction = async ({
    id,
    ...transactionData
}: {
    id: string
} & UpdateTransactionDto): Promise<Transaction> => {
    const { data } = await api.put<Transaction>(
        `/transactions/${id}`,
        transactionData
    )
    return data
}

export const deleteTransaction = async (id: string): Promise<Transaction> => {
    const { data } = await api.delete<Transaction>(`/transactions/${id}`)
    return data
}
