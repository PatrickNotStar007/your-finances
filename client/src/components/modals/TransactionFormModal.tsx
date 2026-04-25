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
                createdAt: editData.createdAt ?? new Date(),
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
                const updateData: UpdateTransactionDto = {
                    amount: formData.amount,
                    type: formData.type,
                    category: formData.category,
                    createdAt: formData.createdAt,
                    comment: formData.comment,
                }
                updateMutation.mutate(updateData)
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
            setToastMessage('Транзакция успешно создана :)')
            hadnleSuccess()
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
            hadnleSuccess()
        },
    })

    const hadnleSuccess = () => {
        closeModal(`transaction_${mode}_modal`)
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
            <dialog id={`transaction_${mode}_modal`} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{modalTitle}</h3>
                    <form onSubmit={handleSubmit}>
                        <fieldset className="fieldset p-4">
                            {/* сумма */}
                            <label className="label">Сумма</label>
                            <div>
                                <input
                                    type="number"
                                    className="input validator"
                                    value={formData.amount}
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            amount: parseFloat(e.target.value),
                                        })
                                    }}
                                    required
                                    placeholder="100"
                                    min="1"
                                    max="999999999"
                                    title="Must be between be 1 to 10"
                                />
                                <p className="validator-hint">
                                    Введите число от 1 до 999999999
                                </p>
                            </div>

                            {/* тип */}
                            <label className="label">Тип</label>
                            <div>
                                <select
                                    value={formData.type}
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            type: e.target.value as
                                                | 'income'
                                                | 'expense',
                                        })
                                    }}
                                    className="select"
                                >
                                    <option value="income">Доходы</option>
                                    <option value="expense">Расходы</option>
                                </select>
                            </div>
                            <label className="label">Категория</label>
                            <div>
                                <input
                                    type="text"
                                    className="input validator"
                                    value={formData.category}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            category: e.target.value,
                                        })
                                    }
                                    required
                                    placeholder="транспорт"
                                    pattern="[A-Za-zА-Яа-я][A-Za-zА-Яа-я0-9\-]*"
                                    minLength={3}
                                    maxLength={30}
                                    title="только буквы, числа, тире"
                                />
                                <p className="validator-hint">
                                    Введите от 3 до 30 символов
                                    <br />
                                    (только буквы, числа, тире)
                                </p>
                            </div>

                            {/* дата */}
                            <label className="label">Дата</label>
                            <input
                                type="date"
                                className="input validator"
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

                            {/* описание */}
                            <label className="label">
                                Описание (необязательно)
                            </label>
                            <div>
                                <input
                                    type="text"
                                    className="input validator"
                                    value={formData.comment}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            comment: e.target.value,
                                        })
                                    }
                                    // placeholder="транспорт"
                                    pattern="[A-Za-zА-Яа-я][A-Za-zА-Яа-я0-9\-]*"
                                    // minLength={3}
                                    // maxLength={30}
                                    title="Only letters, numbers or dash"
                                />
                                <p className="validator-hint">
                                    Введите от 3 до 30 символов
                                    <br />
                                    (только буквы, числа, тире)
                                </p>
                            </div>
                            <button className="btn" type="submit">
                                {buttonText}
                            </button>
                        </fieldset>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            {showToast && (
                <div className="toast">
                    <div
                        className={`alert ${toastMessage.includes('успешно') ? 'alert-success' : 'alert-error'} `}
                    >
                        <span>{toastMessage}</span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TransactionFormModal
