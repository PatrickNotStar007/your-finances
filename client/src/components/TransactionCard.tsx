import type { Transaction } from '../types/transaction.types'

interface TransactionCardProps extends Transaction {
    setSelectedId: (id: string) => void
}

const TransactionCard = (props: TransactionCardProps) => {
    return (
        <>
            <div className="card w-80 bg-base-100 shadow-lg">
                <div className="card-body">
                    <div className="flex justify-between">
                        <h2 className="text-2xl font-bold">{props.category}</h2>
                        <span className="text-2xl">{props.amount}</span>
                    </div>
                    <ul className="mt-6 flex flex-col gap-2 text-xl">
                        <li>
                            Тип:{' '}
                            <span
                                className={`font-bold ${props.type === 'income' ? 'text-green-500' : 'text-red-500'}`}
                            >
                                {props.type === 'income' ? 'доходы' : 'расходы'}
                            </span>
                        </li>
                        <li>
                            Дата:{' '}
                            <span>
                                {new Date(props.createdAt).toLocaleDateString()}
                            </span>
                        </li>
                        {props.comment && (
                            <li>
                                <span></span>
                            </li>
                        )}
                    </ul>
                    <div className="flex gap-4 mt-6">
                        <button className="btn btn-primary flex-1">
                            Редактировать
                        </button>
                        <button
                            className="btn btn-error flex-1 text-white"
                            onClick={() => {
                                const modal = document.getElementById(
                                    'delete_modal'
                                ) as HTMLDialogElement
                                modal?.showModal()
                                props.setSelectedId(props.id)
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
