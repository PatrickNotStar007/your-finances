import { FilterIcon, ListCheckIcon, PlusIcon } from 'lucide-react'
import TransactionModal from './modals/TransactionFormModal'
import AnalyticsModal from './modals/AnalyticsModal'
import { openModal } from '../lib/helpers/dashboard.helpers'

const ControlPanel = () => {
    return (
        <div className="flex justify-between gap-3">
            <button
                className="btn btn-ghost mr-auto"
                onClick={() => openModal('create_modal')}
            >
                <PlusIcon className="size-5" />
                <span className="hidden sm:inline">Добавить транзакцию</span>
            </button>
            <button
                className="btn btn-ghost"
                onClick={() => openModal('filter_modal')}
            >
                <FilterIcon className="size-5" />
                Фильтрация
            </button>
            <TransactionModal mode="create" />
            <button
                className="btn btn-ghost"
                onClick={() => openModal('analytics_modal')}
            >
                <ListCheckIcon className="size-5" />
                Аналитика
            </button>
            <AnalyticsModal />
        </div>
    )
}

export default ControlPanel
