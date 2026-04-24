import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { getSummary } from '../../lib/api/summary.api'
import { useAuth } from '../../hooks/auth.hook'
import { closeModal, openModal } from '../../lib/helpers/dashboard.helpers'
import SummaryModal from './SummaryModal'

interface FormData {
    startDate?: Date
    endDate?: Date
}

interface SummaryData extends FormData {
    totalIncome: number
    totalExpense: number
    balance: number
    groupByCategory: Record<string, number>
}

const AnalyticsModal = () => {
    const { userId } = useAuth()
    if (!userId) throw new Error('User not authenticated')

    const [formData, setFormData] = useState<FormData>({})
    const [summaryData, setSummaryData] = useState<SummaryData | null>(null)

    const { refetch } = useQuery({
        queryKey: ['summary', userId, formData.startDate, formData.endDate],
        queryFn: async () => {
            return await getSummary({
                userId,
                startDate: formData.startDate?.toISOString(),
                endDate: formData.endDate?.toISOString(),
            })
        },
        enabled: false,
    })

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        const result = await refetch()
        if (result.data) {
            setSummaryData({
                balance: result.data.balance,
                totalIncome: result.data.totalIncome,
                totalExpense: result.data.totalExpense,
                startDate: formData.startDate,
                endDate: formData.endDate,
                groupByCategory: result.data.groupByCategory,
            })
            closeModal('analytics_modal')
            openModal('summary_modal')
        }
    }

    return (
        <>
            <dialog id="analytics_modal" className="modal">
                <div className="modal-box max-w-92">
                    <h3 className="font-bold text-lg">Укажите период</h3>
                    <form onSubmit={handleSubmit}>
                        <fieldset className="fieldset p-4">
                            {/* дата начала */}
                            <label className="label">
                                Дата начала (по умолчанию первый день месяца)
                            </label>
                            <input
                                type="date"
                                value={
                                    formData.startDate
                                        ? formData.startDate
                                              .toISOString()
                                              .split('T')[0]
                                        : ''
                                }
                                className="input validator mb-1"
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        startDate: new Date(e.target.value),
                                    })
                                }
                            />
                            {/* дата конца */}
                            <label className="label">
                                Дата конца (по умолчанию последний день месяца)
                            </label>
                            <input
                                type="date"
                                value={
                                    formData.endDate
                                        ? formData.endDate
                                              .toISOString()
                                              .split('T')[0]
                                        : ''
                                }
                                className="input validator mb-3"
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        endDate: new Date(e.target.value),
                                    })
                                }
                            />
                            <button className="btn btn-primary" type="submit">
                                Получить аналитику
                            </button>
                        </fieldset>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            <SummaryModal
                setFormData={setFormData}
                balance={summaryData?.balance ?? 0}
                totalIncome={summaryData?.totalIncome ?? 0}
                totalExpense={summaryData?.totalExpense ?? 0}
                groupByCategory={summaryData?.groupByCategory ?? {}}
                startDate={summaryData?.startDate}
                endDate={summaryData?.endDate}
            />
        </>
    )
}

export default AnalyticsModal
