import { Link } from 'react-router'
import ThemeSelector from './ThemeSelector'
import { CircleDollarSign, PlusIcon } from 'lucide-react'
import { useAuth, useLogout } from '../hooks/auth.hook'
import TransactionModal from './TransactionModal'

const Navbar = () => {
    const { isAuthenticated } = useAuth()

    const logout = useLogout()

    const handleLogout = () => {
        logout.mutate()
    }

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="max-w-5xl mx-auto w-full px-4 flex justify-between items-center">
                <div className="flex-1">
                    <Link to="/" className="btn btn-ghost text-xl">
                        <CircleDollarSign className="size-5 text-primary" />
                        <span className="text-lg font-bold">ТвоиФинансы</span>
                    </Link>
                </div>
                <div className="flex gap-2 items-center">
                    <ThemeSelector />
                    {isAuthenticated ? (
                        <>
                            <button
                                className="btn btn-ghost gap-1"
                                onClick={() => {
                                    const modal = document.getElementById(
                                        'my_modal_2'
                                    ) as HTMLDialogElement
                                    modal.showModal()
                                }}
                            >
                                <PlusIcon className="size-4" />
                                <span className="hidden sm:inline">
                                    Добавить транзакцию
                                </span>
                            </button>
                            <TransactionModal />
                            <button
                                onClick={handleLogout}
                                className="btn btn-ghost"
                            >
                                Выйти
                            </button>
                        </>
                    ) : (
                        <>
                            <button className="btn btn-ghost ">Войти</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar
