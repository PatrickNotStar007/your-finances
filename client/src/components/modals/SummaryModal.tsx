import { closeModal } from '../../lib/helpers/dashboard.helpers'

interface SummaryProps {
    totalIncome: number
    totalExpense: number
    balance: number
    // groupByCategory: Record<string, number>
    startDate?: string
    endDate?: string
}

const SummaryModal = (props: SummaryProps) => {
    const dateDataString =
        props.startDate && props.endDate
            ? `период с ${props.startDate} по ${props.endDate}`
            : 'последний месяц'

    return (
        <dialog id="summary_modal" className="modal">
            <div className="modal-box max-w-155">
                <h3 className="font-bold text-2xl mb-4">
                    Аналитика за {dateDataString}
                </h3>
                <p className="text-xl">Итого денег: {props.balance}</p>
                <p className="text-xl">Итоговый доход: {props.totalIncome}</p>
                <p className="text-xl">Итоговый расход: {props.totalExpense}</p>
                <button
                    className="btn btn-primary mt-6"
                    onClick={() => closeModal('summary_modal')}
                >
                    Ок
                </button>
            </div>
        </dialog>
    )
}

export default SummaryModal
