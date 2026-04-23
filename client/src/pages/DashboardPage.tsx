import { useQuery } from '@tanstack/react-query'
import { getTransactions } from '../lib/api/transaction.api'
import TransactionCard from '../components/TransactionCard'
import { TRANSACTIONS } from '../constants/transaction.constants'
import DeleteModal from '../components/DeleteModal'
import { useState } from 'react'
import ControlPanel from '../components/ControlPanel'

const DashboardPage = () => {
    const [selectedId, setSelectedId] = useState('')
    const { data, isLoading } = useQuery({
        queryKey: [TRANSACTIONS],
        queryFn: async () => await getTransactions(),
    })

    if (isLoading) {
        return <div>Загрузка...</div>
    } else {
        return (
            <>
                <div className="mb-4">
                    <ControlPanel />
                </div>
                <div className="flex flex-wrap gap-4">
                    {data?.map((t) => (
                        <TransactionCard
                            key={t.id}
                            id={t.id}
                            amount={t.amount}
                            category={t.category}
                            createdAt={t.createdAt}
                            type={t.type}
                            userId={t.userId}
                            comment={t.comment}
                            setSelectedId={setSelectedId}
                        />
                    ))}
                    <DeleteModal id={selectedId} />
                </div>
            </>
        )
    }
}

export default DashboardPage
