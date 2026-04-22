import { useState } from 'react'
import type { Transaction } from '../types/transaction.types'
import { useAuth } from '../hooks/auth.hook'
import { useMutation } from '@tanstack/react-query'
import { createTransaction } from '../lib/api/transaction.api'

const TransactionModal = () => {
    const { userId } = useAuth()

    const [openToast, setOpenToast] = useState(false)

    const [formData, setFormData] = useState<Transaction>({
        amount: 0,
        type: 'income',
        category: '',
        createdAt: new Date(),
        userId: userId || '',
        comment: '',
    })

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        createTransactionMutation.mutate(formData)
        console.log('submit: ', formData)
    }

    const createTransactionMutation = useMutation({
        mutationFn: async (formData: Transaction) =>
            await createTransaction(formData),
        onSuccess: () => {
            const modal = document.getElementById(
                'my_modal_2'
            ) as HTMLDialogElement
            modal.close()

            setOpenToast(true)
            setTimeout(() => setOpenToast(false), 3000)
        },
    })

    return (
        <>
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Новая транзакция</h3>
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
                                Создать
                            </button>
                        </fieldset>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            {openToast && (
                <div id="success_toast" className="toast">
                    <div className="alert alert-success">
                        <span>Транзакция успешно создана :)</span>
                    </div>
                </div>
            )}
        </>
    )
}

export default TransactionModal
