import { useEffect, useState } from 'react'

const THEMES = ['light', 'dark']
const translateTheme = (engTheme: string) => {
    if (engTheme === 'light') return 'светлая'
    if (engTheme === 'dark') return 'тёмная'
}

const ThemeSelector = () => {
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') || 'light'
        }

        return 'light'
    })

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('theme', theme)
    }, [theme])

    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost gap-1">
                <span className="hidden sm:inline">Тема</span>
            </div>
            <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-200 rounded-box z-50 w-26 p-2 shadow-xl 
                max-h-96 overflow-y-auto flex-nowrap"
            >
                {THEMES.map((t) => (
                    <li key={t}>
                        <button
                            onClick={() => {
                                const dropdown =
                                    document.activeElement as HTMLElement
                                dropdown.blur()
                                setTheme(t)
                            }}
                            className={`${theme === t ? 'bg-primary text-primary-content' : ''}`}
                        >
                            <span>{translateTheme(t)}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ThemeSelector
