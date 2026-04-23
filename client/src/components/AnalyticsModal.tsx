import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { getSummary } from '../lib/api/summary.api'
import { useAuth } from '../hooks/auth.hook'

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

    if (data) console.log(data)

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        refetch()
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
            </dialog>
        </>
    )
}

export default AnalyticsModal
