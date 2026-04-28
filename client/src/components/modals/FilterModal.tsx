import { useState } from 'react'
import { closeModal, formatDateForInput } from '../../lib/helpers/modal.helpers'
import { isStartDateAfterEndDate } from '../../lib/validators/date.validator'

interface FormDataType {
    type?: 'income' | 'expense'
    category?: string
    startDate?: Date
    endDate?: Date
}

interface FilterModalProps {
    setFilters: (filters: FormDataType) => void
}

const FilterModal = ({ setFilters }: FilterModalProps) => {
    const [isError, setIsError] = useState(false)
    const [formData, setFormData] = useState<FormDataType>({})

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (isStartDateAfterEndDate(formData.startDate, formData.endDate)) {
            setIsError(true)
            return
        }

        const filtersToApply = { ...formData }
        setFilters(filtersToApply)

        resetForm()
        closeModal('filter_modal')
    }

    const handleTypeClick = (type: 'income' | 'expense') => {
        setFormData((prev) => ({
            ...prev,
            type: prev.type === type ? undefined : type,
        }))
    }

    const handleDateChange = (
        field: 'startDate' | 'endDate',
        dateString: string
    ) => {
        setIsError(false)
        setFormData({
            ...formData,
            [field]: new Date(dateString),
        })
    }

    const resetForm = () => {
        const timer = setTimeout(() => {
            setIsError(false)
            setFormData({
                type: undefined,
                category: '',
            })
        }, 300)
        return () => clearTimeout(timer)
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
                                    onClick={() => handleTypeClick('income')}
                                >
                                    Доход
                                </button>
                                <button
                                    type="button"
                                    className={`flex-1 btn btn-error ${formData.type === 'expense' ? 'text-white' : 'btn-outline'}`}
                                    onClick={() => handleTypeClick('expense')}
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
                                value={formData.category || ''}
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
                                className={`input w-full focus:input-primary transition-all ${isError ? 'input-error' : ''}`}
                                value={formatDateForInput(formData.startDate)}
                                onChange={(e) =>
                                    handleDateChange(
                                        'startDate',
                                        e.target.value
                                    )
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
                                className={`input w-full focus:input-primary transition-all ${isError ? 'input-error' : ''}`}
                                value={formatDateForInput(formData.endDate)}
                                onChange={(e) =>
                                    handleDateChange('endDate', e.target.value)
                                }
                            />
                            {isError && (
                                <span className="text-error">
                                    Дата конца должна быть больше даты начала
                                </span>
                            )}
                        </div>

                        {/* кнопки */}
                        <div className="flex gap-3 mt-10">
                            <button
                                className="btn btn-outline flex-1"
                                type="button"
                                onClick={() => {
                                    closeModal('filter_modal')
                                    resetForm()
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

            <form
                method="dialog"
                className="modal-backdrop"
                onClick={() => resetForm()}
            >
                <button>close</button>
            </form>
        </dialog>
    )
}

export default FilterModal
