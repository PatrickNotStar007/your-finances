import { InfoIcon } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'

interface AuthFormProps {
    config: {
        formType: string
        title: string
        buttonText: string
    }
}

const AuthForm = ({ config }: AuthFormProps) => {
    const { formType, title, buttonText } = config

    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: '',
    })
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
    }

    return (
        <div className="max-w-md m-auto bg-base-300 flex items-center justify-center p-4 rounded-xl">
            <div className="card w-full bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-2xl font-bold text-center justify-center">
                        {title}
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* почта */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">
                                    Email
                                </span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                placeholder="example@mail.com"
                                className={`input input-bordered w-full 'input-error' : ''}`}
                            />
                        </div>

                        {/* имя */}
                        {formType === 'register' && (
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">
                                        Имя
                                    </span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.name}
                                    placeholder="мегатрон"
                                    className={`input input-bordered w-full 'input-error' : ''}`}
                                />
                            </div>
                        )}

                        {/* пароль */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">
                                    Пароль
                                </span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                placeholder="••••••"
                                className={`input input-bordered w-full `}
                            />
                        </div>

                        {/* Кнопка отправки */}
                        <div className="form-control mt-6">
                            <button
                                type="submit"
                                className={`btn btn-primary w-full ${loading ? 'loading' : ''}`}
                                disabled={loading}
                            >
                                {loading ? 'Вход...' : `${buttonText}`}
                            </button>
                        </div>
                    </form>

                    {/* Дополнительная информация */}
                    {formType === 'login' && (
                        <>
                            <div className="divider">или</div>
                            <div className="text-center">
                                <p className="text-sm">
                                    Нет аккаунта?{' '}
                                    <Link
                                        to="/registration"
                                        className="link link-primary"
                                    >
                                        Зарегистрироваться
                                    </Link>
                                </p>
                            </div>

                            <div className="alert alert-info mt-4 text-sm">
                                <InfoIcon className="w-5 h-5" />
                                <span>
                                    Демо: admin@example.com / password123
                                </span>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AuthForm
