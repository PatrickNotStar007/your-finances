import { api } from '../axios'

interface SummaryParams {
    userId: string
    startDate?: string
    endDate?: string
}

interface SummaryResponse {
    totalIncome: number
    totalExpense: number
    balance: number
    groupByCategory: Record<string, number>
}

export const getSummary = async (
    summaryParams: SummaryParams
): Promise<SummaryResponse> => {
    const { data } = await api.get<SummaryResponse>('/analytics/summary', {
        params: summaryParams,
    })
    return data
}
