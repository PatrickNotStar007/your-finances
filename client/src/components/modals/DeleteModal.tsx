import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TRANSACTIONS } from '../../constants/transaction.constants'
import { deleteTransaction } from '../../lib/api/transaction.api'
import { closeModal } from '../../lib/helpers/modal.helpers'
import useToast from '../../hooks/UseToast'
import Toast from '../Toast'

interface DeleteProps {
    transactionId: string
}

const DeleteModal = ({ transactionId }: DeleteProps) => {
    const queryClient = useQueryClient()
    const { isVisible, showToast, toastMessage, toastType } = useToast()

    const deleteMutation = useMutation({
        mutationFn: async () => {
            await deleteTransaction(transactionId)
        },
        onSuccess: () => {
            closeModal('delete_modal')
            showToast('Транзакция успешно удалена :(', 'success')

            queryClient.invalidateQueries({
                queryKey: [TRANSACTIONS],
            })
        },
        onError: (e) => {
            console.log(e)
        },
    })

    return (
        <>
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
            </dialog>

            {isVisible && <Toast message={toastMessage} type={toastType} />}
        </>
    )
}

export default DeleteModal
