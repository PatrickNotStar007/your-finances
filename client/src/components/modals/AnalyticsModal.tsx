import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { getSummary } from '../../lib/api/summary.api'
import { useAuth } from '../../hooks/auth.hook'
import { closeModal, openModal } from '../../lib/helpers/dashboard.helpers'
import SummaryModal from './SummaryModal'

const AnalyticsModal = () => {
    const { userId } = useAuth()
    if (!userId) {
        throw Error
    }

    const [formData, setFormData] = useState<{
        startDate?: Date
        endDate?: Date
    }>({
        startDate: undefined,
        endDate: undefined,
    })

    const { data, error, refetch } = useQuery({
        queryKey: ['summary', userId, formData.startDate, formData.endDate],
        queryFn: async () =>
            await getSummary({
                userId,
                startDate: formData.startDate?.toISOString(),
                endDate: formData.endDate?.toISOString(),
            }),
        enabled: false,
    })

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!error) {
            closeModal('analytics_modal')
            refetch()
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
                <SummaryModal
                    balance={1}
                    totalIncome={2}
                    totalExpense={3}
                    // groupByCategory=
                    startDate={formData.startDate
                        ?.toLocaleDateString('ru-RU')
                        .split('.')
                        .reverse()
                        .join('.')}
                    endDate={formData.endDate
                        ?.toLocaleDateString('ru-RU')
                        .split('.')
                        .reverse()
                        .join('.')}
                />
            </dialog>
        </>
    )
}

export default AnalyticsModal
