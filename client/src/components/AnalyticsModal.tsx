import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

const AnalyticsModal = () => {
    const [formData, setFormData] = useState<{
        startDate?: Date
        endDate?: Date
    }>({
        startDate: undefined,
        endDate: undefined,
    })

    const summary = useQuery({
        queryKey: ['summary'],
        queryFn: ()=>
    })

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(formData)
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
