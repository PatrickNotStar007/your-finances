import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TRANSACTIONS } from '../../constants/transaction.constants'
import { useState } from 'react'
import { deleteTransaction } from '../../lib/api/transaction.api'
import { closeModal } from '../../lib/helpers/dashboard.helpers'

interface DeleteProps {
    id: string
}

const DeleteModal = ({ id }: DeleteProps) => {
    const queryClient = useQueryClient()
    const [openToast, setOpenToast] = useState(false)

    const deleteMutation = useMutation({
        mutationFn: async () => {
            await deleteTransaction(id)
        },
        onSuccess: () => {
            closeModal('delete_modal')
            setOpenToast(true)
            setTimeout(() => setOpenToast(false), 3000)
            queryClient.invalidateQueries({ queryKey: [TRANSACTIONS] })
        },
        onError: (e) => {
            console.log(e)
        },
    })

    return (
        <dialog id="delete_modal" className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                    </button>
                </form>
                <h3 className="font-bold text-lg">Удаление</h3>
                <p className="py-4">
                    Вы точно хотите удалить данную транзакцию?
                </p>
                <div className="flex gap-4">
                    <button
                        className="btn btn-error text-white"
                        onClick={() => deleteMutation.mutate()}
                    >
                        Удалить
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={() => closeModal('delete_modal')}
                    >
                        Нет
                    </button>
                </div>
            </div>
            {openToast && (
                <div id="success_toast" className="toast">
                    <div className="alert alert-success">
                        <span>Транзакция успешно удалена :(</span>
                    </div>
                </div>
            )}
        </dialog>
    )
}

export default DeleteModal
