import { api } from '../axios'

interface SummaryParams {
    userId: string
    startDateStr?: string
    endDateStr?: string
}

interface SummaryResponse {
    totalIncome: number
    totalExpense: number
    balance: number
    // groupByCategory: groupBy
}

export const getSummary = async (summaryParams: SummaryParams) => {
    const { data } = await api.get<SummaryParams>('/summary', {
        params: summaryParams,
    })
    return { ...data }
}
