import { useEffect, useState } from 'react'
import type {
    CreateTransactionDto,
    UpdateTransactionDto,
} from '../../types/transaction.types'
import { useAuth } from '../../hooks/auth.hook'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
    createTransaction,
    updateTransaction,
} from '../../lib/api/transaction.api'
import { TRANSACTIONS } from '../../constants/transaction.constants'
import { closeModal } from '../../lib/helpers/dashboard.helpers'
import { toDate } from '../../lib/helpers/transaction.helpers'

type Mode = 'create' | 'edit'

interface TransactionModalProps {
    mode: Mode
    transactionId?: string
    editData?: UpdateTransactionDto
}

interface FormDataType {
    amount: number
    type: 'income' | 'expense'
    category: string
    createdAt: Date
    comment?: string
}

const TransactionFormModal = ({
    transactionId,
    mode,
    editData,
}: TransactionModalProps) => {
    const queryClient = useQueryClient()
    const { userId } = useAuth()
    if (!userId) throw new Error('Пользователь не авторизован')

    const getInitialData = (): FormDataType => {
        if (mode === 'edit' && editData)
            return {
                amount: editData.amount ?? 0,
                type: editData.type ?? 'income',
                category: editData.category ?? '',
                createdAt: toDate(editData.createdAt),
                comment: editData.comment,
            }
        else {
            return {
                amount: 0,
                type: 'income',
                category: '',
                createdAt: new Date(),
                comment: '',
            }
        }
    }

    const [showToast, setShowToast] = useState(false)
    const [toastMessage, setToastMessage] = useState('')
    const [formData, setFormData] = useState<FormDataType>(getInitialData())

    useEffect(() => setFormData(getInitialData()), [editData])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const commonData = {
            amount: formData.amount,
            type: formData.type,
            category: formData.category,
            createdAt: formData.createdAt,
            comment: formData.comment,
        }
        switch (mode) {
            case 'create': {
                createMutation.mutate({ userId, ...commonData })
                break
            }
            case 'edit': {
                updateMutation.mutate(commonData)
                break
            }
            default:
                break
        }
    }

    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => setShowToast(false), 3000)
            return () => clearTimeout(timer)
        }
    }, [showToast])

    const createMutation = useMutation({
        mutationFn: async (formData: CreateTransactionDto) => {
            await createTransaction(formData)
        },
        onSuccess: () => {
            setFormData(getInitialData())
            setToastMessage('Транзакция успешно создана :)')
            handleSuccess()
        },
    })

    const updateMutation = useMutation({
        mutationFn: async (formData: UpdateTransactionDto) => {
            if (transactionId) {
                await updateTransaction({ transactionId, ...formData })
            }
        },
        onSuccess: () => {
            setToastMessage('Транзакция успешно исправлена :)')
            handleSuccess()
        },
    })

    const handleSuccess = () => {
        closeModal(`${mode}_modal`)
        setShowToast(true)
        const timer = setTimeout(() => setFormData(getInitialData()), 300)
        clearTimeout(timer)
        queryClient.invalidateQueries({ queryKey: [TRANSACTIONS] })
    }

    const modalTitle =
        mode === 'create' ? 'Новая транзакция' : 'Редактировать транзакцию'
    const buttonText = mode === 'create' ? 'Создать' : 'Сохранить'

    return (
        <div>
            <dialog id={`${mode}_modal`} className="modal">
                <div className="modal-box max-w-120 p-10">
                    <h3 className="font-bold text-xl mb-10">{modalTitle}</h3>

                    <form onSubmit={handleSubmit}>
                        <div className="space-y-5">
                            {/* сумма */}
                            <div>
                                <label className="block text-sm font-semibold  mb-2">
                                    Сумма
                                </label>
                                <div>
                                    <input
                                        type="number"
                                        className="input w-full pl-4 focus:input-primary transition-all"
                                        value={formData.amount || ''}
                                        onChange={(e) => {
                                            setFormData({
                                                ...formData,
                                                amount: parseFloat(
                                                    e.target.value
                                                ),
                                            })
                                        }}
                                        required
                                        placeholder="0"
                                        min="1"
                                        max="999999999"
                                    />
                                </div>
                                <p className="text-xs text-gray-400 mt-1">
                                    От 1 до 999 999 999 ₽
                                </p>
                            </div>

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
                                    required
                                    placeholder="Например: Транспорт, Зарплата..."
                                    pattern="[A-Za-zА-Яа-я][A-Za-zА-Яа-я0-9\-]*"
                                    minLength={3}
                                    maxLength={30}
                                />
                                <p className="text-xs text-gray-400 mt-1">
                                    3-30 символов (буквы, числа, дефис)
                                </p>
                            </div>

                            {/* дата */}
                            <div>
                                <label className="block text-sm font-semibold mb-2">
                                    Дата
                                </label>
                                <input
                                    type="date"
                                    className="input w-full focus:input-primary transition-all"
                                    value={
                                        formData.createdAt
                                            .toISOString()
                                            .split('T')[0]
                                    }
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            createdAt: new Date(e.target.value),
                                        })
                                    }
                                    required
                                />
                            </div>

                            {/* комментарий */}
                            <div>
                                <label className="block text-sm font-semibold mb-2">
                                    Описание
                                    <span className="text-xs font-normal text-gray-400 ml-2">
                                        (необязательно)
                                    </span>
                                </label>
                                <textarea
                                    className="textarea w-full focus:textarea-primary transition-all resize-none"
                                    value={formData.comment}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            comment: e.target.value,
                                        })
                                    }
                                    rows={4}
                                    maxLength={200}
                                    placeholder="Дополнительная информация..."
                                />
                                <p className="text-xs text-gray-400 mt-1 text-right">
                                    {formData.comment?.length || 0}/200
                                </p>
                            </div>

                            {/* кнопки */}
                            <div className="flex gap-3">
                                <button
                                    className="btn btn-outline flex-1"
                                    type="button"
                                    onClick={() => closeModal(`${mode}_modal`)}
                                >
                                    Отмена
                                </button>
                                <button
                                    className="btn btn-primary flex-1"
                                    type="submit"
                                    disabled={
                                        createMutation.isPending ||
                                        updateMutation.isPending
                                    }
                                >
                                    {createMutation.isPending ||
                                    updateMutation.isPending ? (
                                        <span className="loading"></span>
                                    ) : (
                                        <span>{buttonText}</span>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            {/* тост */}
            {showToast && (
                <div className="toast">
                    <div
                        className={`alert ${toastMessage.includes('успешно') ? 'alert-success' : 'alert-error'} `}
                    >
                        <span className="text-white">{toastMessage}</span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TransactionFormModal
