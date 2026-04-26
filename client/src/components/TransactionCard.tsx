import { openModal } from '../lib/helpers/dashboard.helpers'
import type { Transaction } from '../types/transaction.types'
interface TransactionCardProps extends Transaction {
    setSelectedId: (id: string) => void
    onEdit: () => void
}

const TransactionCard = (props: TransactionCardProps) => {
    const formatDate = (dateString: Date) => {
        return new Date(dateString).toLocaleDateString()
    }

    const getTypeText = () => (props.type === 'income' ? 'доходы' : 'расходы')
    const getTypeColor = () =>
        props.type === 'income' ? 'text-green-500' : 'text-red-500'

    return (
        <>
            <div className="card w-80 bg-base-100 shadow-lg hover:shadow-2xl transition-shadow duration-200">
                <div className="card-body">
                    <div className="text-2xl flex justify-between items-start gap-2">
                        <h2 className="font-bold">{props.category}</h2>
                        <span className={`font-semibold ${getTypeColor()}`}>
                            {props.amount}
                        </span>
                    </div>

                    <ul className="mt-4 space-y-2 text-base">
                        <li className="flex justify-between">
                            <span className="text-gray-600">Тип:</span>
                            <span className={`font-semibold ${getTypeColor()}`}>
                                {getTypeText()}
                            </span>
                        </li>
                        <li className="flex justify-between">
                            <span className="text-gray-600">Дата:</span>
                            <span className="font-medium">
                                {formatDate(props.createdAt)}
                            </span>
                        </li>
                        {props.comment && (
                            <li className="mt-2 pt-2 border-t border-gray-100">
                                <p className="mt-1 text-gray-700 wrap-break-word">
                                    {props.comment}
                                </p>
                            </li>
                        )}
                    </ul>

                    <div className="flex gap-3 mt-6">
                        <button
                            className="btn btn-outline btn-primary flex-1"
                            onClick={() => props.onEdit()}
                        >
                            Редактировать
                        </button>
                        <button
                            className="btn btn-error flex-1 text-white hover:bg-red-700"
                            // onClick={() => onClickHandler()}
                            onClick={() => {
                                props.setSelectedId(props.id)
                                openModal('delete_modal')
                            }}
                        >
                            Удалить
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TransactionCard
