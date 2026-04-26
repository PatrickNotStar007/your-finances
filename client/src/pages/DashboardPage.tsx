import { useQuery } from '@tanstack/react-query'
import { getTransactions } from '../lib/api/transaction.api'
import TransactionCard from '../components/TransactionCard'
import { TRANSACTIONS } from '../constants/transaction.constants'
import DeleteModal from '../components/modals/DeleteModal'
import { useState } from 'react'
import ControlPanel from '../components/ControlPanel'
import TransactionFormModal from '../components/modals/TransactionFormModal'
import type {
    Transaction,
    UpdateTransactionDto,
} from '../types/transaction.types'
import { openModal } from '../lib/helpers/dashboard.helpers'

const DashboardPage = () => {
    const [selectedTransaction, setSelectedTransaction] =
        useState<Transaction | null>(null)
    const [selectedId, setSelectedId] = useState('')
    const { data, isLoading } = useQuery({
        queryKey: [TRANSACTIONS],
        queryFn: async () => await getTransactions(),
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
                    <ControlPanel />
                </div>
                <div className="flex flex-wrap gap-4">
                    {data?.map((transaction) => (
                        <TransactionCard
                            key={transaction.id}
                            {...transaction}
                            setSelectedId={setSelectedId}
                            onEdit={() => handleEdit(transaction)}
                        />
                    ))}
                </div>

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
