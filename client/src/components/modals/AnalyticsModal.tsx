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

    const [isError, setIsError] = useState(false)
    const [formData, setFormData] = useState<FormData>({})
    const [summaryData, setSummaryData] = useState<SummaryData | null>(null)

    const { refetch, isFetching } = useQuery({
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

    const handleOnChange = (field: keyof FormData, value: string) => {
        setFormData({
            ...formData,
            [field]: value ? new Date(value) : undefined,
        })
        setIsError(false)
    }

    const handleClose = () => {
        setFormData({})
        setIsError(false)
        closeModal('analytics_modal')
    }

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (
            formData.startDate &&
            formData.endDate &&
            formData.startDate > formData.endDate
        ) {
            setIsError(true)
            return
        }

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
            handleClose()
            openModal('summary_modal')
        }
    }

    return (
        <>
            <dialog id="analytics_modal" className="modal">
                <div className="modal-box max-w-92 p-4 sm:p-6">
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
                                className={`input ${isError ? 'input-error' : ''}`}
                                onChange={(e) =>
                                    handleOnChange('startDate', e.target.value)
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
                                className={`input ${isError ? 'input-error' : ''}`}
                                onChange={(e) =>
                                    handleOnChange('endDate', e.target.value)
                                }
                            />
                            {isError && (
                                <span className="text-error">
                                    Дата конца должна быть больше даты начала
                                </span>
                            )}
                            <button
                                className="btn btn-primary mt-3"
                                type="submit"
                                disabled={isFetching}
                            >
                                {isFetching ? (
                                    <>
                                        <span className="loading loading-spinner"></span>
                                    </>
                                ) : (
                                    'Получить аналитику'
                                )}
                            </button>
                        </fieldset>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button onClick={handleClose}>close</button>
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
