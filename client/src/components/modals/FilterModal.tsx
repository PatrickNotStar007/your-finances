import { useState } from 'react'
import { closeModal } from '../../lib/helpers/dashboard.helpers'

interface FormDataType {
    type?: 'income' | 'expense'
    category?: string
    startDate?: Date | null
    endDate?: Date | null
}

interface FilterModalProps {
    setFilters: (filters: FormDataType) => void
}

const FilterModal = ({ setFilters }: FilterModalProps) => {
    const [formData, setFormData] = useState<FormDataType>({})

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const filtersToApply = { ...formData }
        setFilters(filtersToApply)

        resetForm()
        closeModal('filter_modal')
    }

    const resetForm = () => {
        setFormData({
            type: undefined,
            category: '',
            startDate: null,
            endDate: null,
        })
    }

    return (
        <dialog id="filter_modal" className="modal">
            <div className="modal-box max-w-120 p-10">
                <h3 className="font-bold text-xl mb-7">Фильтрация</h3>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-5">
                        {/* тип */}
                        <div>
                            <label className="block text-sm font-semibold mb-2">
                                Тип
                            </label>
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    className={`flex-1 btn btn-success ${formData.type === 'income' ? 'text-white' : 'btn-outline'}`}
                                    onClick={() => {
                                        setFormData({
                                            ...formData,
                                            type: 'income',
                                        })
                                    }}
                                >
                                    Доход
                                </button>
                                <button
                                    type="button"
                                    className={`flex-1 btn btn-error ${formData.type === 'expense' ? 'text-white' : 'btn-outline'}`}
                                    onClick={() => {
                                        setFormData({
                                            ...formData,
                                            type: 'expense',
                                        })
                                    }}
                                >
                                    Расход
                                </button>
                            </div>
                        </div>

                        {/* категория */}
                        <div>
                            <label className="block text-sm font-semibold mb-2">
                                Категория
                            </label>
                            <input
                                type="text"
                                className="input w-full focus:input-primary transition-all"
                                value={formData.category}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        category: e.target.value,
                                    })
                                }
                                placeholder="Например: Транспорт, Зарплата..."
                                pattern="[A-Za-zА-Яа-я][A-Za-zА-Яа-я0-9\-]*"
                                minLength={3}
                                maxLength={30}
                            />
                        </div>

                        {/* дата начала */}
                        <div>
                            <label className="block text-sm font-semibold mb-2">
                                Дата начала
                            </label>
                            <input
                                type="date"
                                className="input w-full focus:input-primary transition-all"
                                value={
                                    formData.startDate
                                        ?.toISOString()
                                        .split('T')[0]
                                }
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        startDate: new Date(e.target.value),
                                    })
                                }
                            />
                        </div>

                        {/* дата конца */}
                        <div>
                            <label className="block text-sm font-semibold mb-2">
                                Дата конца
                            </label>
                            <input
                                type="date"
                                className="input w-full focus:input-primary transition-all"
                                value={
                                    formData.endDate
                                        ?.toISOString()
                                        .split('T')[0]
                                }
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        endDate: new Date(e.target.value),
                                    })
                                }
                            />
                        </div>

                        {/* кнопки */}
                        <div className="flex gap-3 mt-10">
                            <button
                                className="btn btn-outline flex-1"
                                type="button"
                                onClick={() => {
                                    closeModal('filter_modal')
                                    setFormData({})
                                }}
                            >
                                Отмена
                            </button>
                            <button
                                className="btn btn-primary flex-1"
                                type="submit"
                            >
                                ОК
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}

export default FilterModal
