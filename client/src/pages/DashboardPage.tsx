import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getTransactions } from '../lib/api/transaction.api'
import TransactionCard from '../components/TransactionCard'
import { TRANSACTIONS } from '../constants/transaction.constants'
import DeleteModal from '../components/modals/DeleteModal'
import { useState } from 'react'
import ControlPanel from '../components/ControlPanel'
import TransactionFormModal from '../components/modals/TransactionFormModal'
import type {
    Transaction,
    TransactionsFilter,
    UpdateTransactionDto,
} from '../types/transaction.types'
import { openModal } from '../lib/helpers/dashboard.helpers'
import { useAuth } from '../hooks/auth.hook'

const DashboardPage = () => {
    const { userId } = useAuth()
    if (!userId) throw Error

    const [selectedTransaction, setSelectedTransaction] =
        useState<Transaction | null>(null)
    const [selectedId, setSelectedId] = useState('')

    const [filters, setFilters] = useState<TransactionsFilter>({ userId })

    const { data, isLoading } = useQuery({
        queryKey: [TRANSACTIONS, filters],
        queryFn: async () => await getTransactions({ ...filters }),
        placeholderData: keepPreviousData,
    })

    const handleEdit = (transaction: Transaction) => {
        setSelectedTransaction(transaction)
        openModal('edit_modal')
    }

    if (isLoading) {
        return <div>Загрузка...</div>
    } else {
        return (
            <>
                <div className="mb-4">
                    <ControlPanel setFilters={setFilters} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center">
                    {data?.map((transaction) => (
                        <TransactionCard
                            key={transaction.id}
                            {...transaction}
                            setSelectedId={setSelectedId}
                            onEdit={() => handleEdit(transaction)}
                        />
                    ))}
                </div>

                {data?.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-xl">
                            У тебя пока нет транзакций :(
                        </p>
                    </div>
                )}

                <TransactionFormModal
                    mode="edit"
                    transactionId={selectedTransaction?.id}
                    editData={selectedTransaction as UpdateTransactionDto}
                />

                <DeleteModal transactionId={selectedId} />
            </>
        )
    }
}

export default DashboardPage
