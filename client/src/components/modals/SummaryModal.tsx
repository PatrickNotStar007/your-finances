import { closeModal, formatDate } from '../../lib/helpers/dashboard.helpers'

interface SummaryProps {
    setFormData: React.Dispatch<
        React.SetStateAction<{
            startDate?: Date
            endDate?: Date
        }>
    >
    totalIncome: number
    totalExpense: number
    balance: number
    groupByCategory: Record<string, number>
    startDate?: Date
    endDate?: Date
}

const SummaryModal = (props: SummaryProps) => {
    const handleClick = async () => {
        closeModal('summary_modal')
        await new Promise((resolve) => setTimeout(resolve, 300))
        props.setFormData({})
    }

    const dateDataString =
        props.startDate && props.endDate
            ? `период с ${formatDate(props.startDate)} по ${formatDate(props.endDate)}`
            : 'последний месяц'

    return (
        <dialog id="summary_modal" className="modal">
            <div className="modal-box max-w-155">
                <h3 className="font-bold text-2xl mb-4">
                    Аналитика за {dateDataString}
                </h3>
                <div className="space-y-2 text-lg">
                    <p>
                        Итого денег:{' '}
                        <span className="font-bold">{props.balance}</span>
                    </p>
                    <p>
                        Итоговый доход:{' '}
                        <span className="font-bold text-success">
                            {props.totalIncome}
                        </span>
                    </p>
                    <p>
                        Итоговый расход:{' '}
                        <span className="font-bold text-error">
                            {props.totalExpense}
                        </span>
                    </p>
                </div>
                {props.totalExpense > 0 && (
                    <div className="mt-6">
                        <div className="font-bold text-lg mb-2">
                            Расходы по категориям:
                        </div>
                        <div className="flex flex-col gap-1">
                            {Object.entries(props.groupByCategory).map(
                                ([category, amount]) => (
                                    <div
                                        key={category}
                                        className="flex justify-between items-center text-base px-2 rounded-lg 
                                        hover:bg-base-300 transition-colors duration-200 cursor-pointer"
                                    >
                                        <span>{category}:</span>
                                        <span className="font-semibold">
                                            {amount}
                                        </span>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                )}
                <button
                    className="btn btn-primary mt-6 w-full"
                    onClick={handleClick}
                >
                    Ок
                </button>
            </div>
        </dialog>
    )
}

export default SummaryModal
