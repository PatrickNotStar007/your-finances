import { FilterIcon, FilterXIcon, ListCheckIcon, PlusIcon } from 'lucide-react'
import TransactionModal from './modals/TransactionFormModal'
import AnalyticsModal from './modals/AnalyticsModal'
import FilterModal from './modals/FilterModal'
import { openModal } from '../lib/helpers/modal.helpers'

interface ControlPanelProps {
    setFilters: (filters: any) => void
}

const ControlPanel = ({ setFilters }: ControlPanelProps) => {
    return (
        <div className="flex justify-between gap-3">
            <button
                className="btn btn-ghost mr-auto"
                onClick={() => openModal('create_modal')}
            >
                <PlusIcon className="size-5" />
                <span className="hidden md:inline">Добавить транзакцию</span>
            </button>
            <button
                className="btn btn-ghost"
                onClick={() => openModal('filter_modal')}
            >
                <FilterIcon className="size-5" />
                <span className="hidden sm:inline">Фильтрация</span>
            </button>
            <button className="btn btn-ghost" onClick={() => setFilters({})}>
                <FilterXIcon className="size-5" />
                <span className="hidden sm:inline">Сбросить фильтры</span>
            </button>
            <button
                className="btn btn-ghost"
                onClick={() => openModal('analytics_modal')}
            >
                <ListCheckIcon className="size-5" />
                <span className="hidden sm:inline">Аналитика</span>
            </button>
            <AnalyticsModal />
            <TransactionModal mode="create" />
            <FilterModal setFilters={setFilters} />
        </div>
    )
}

export default ControlPanel
