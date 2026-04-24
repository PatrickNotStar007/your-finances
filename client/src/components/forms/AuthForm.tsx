import { InfoIcon } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router'
import { useLogin, useRegister } from '../../hooks/auth.hook'
import type { ApiError } from '../../types/error.types'

const AUTH_MODE = {
    LOGIN: 'login',
    REGISTER: 'register',
}

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

    const isLogin = formType === AUTH_MODE.LOGIN
    const isRegister = formType === AUTH_MODE.REGISTER

    const loginMutation = useLogin()
    const registerMutation = useRegister()

    const currentMutation = isLogin ? loginMutation : registerMutation

    const isPending = currentMutation.isPending
    const error = currentMutation.error

    const getErrorMessage = () => {
        if (!error) return null

        if (error) {
            const axiosError = error as ApiError
            return axiosError.response?.data.message
        }
    }

    const errorMessage = getErrorMessage()

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (isLogin) {
            loginMutation.mutate({
                email: formData.email,
                password: formData.password,
            })
        }

        if (isRegister) {
            registerMutation.mutate({
                email: formData.email,
                name: formData.name,
                password: formData.password,
            })
        }
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
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        email: e.target.value,
                                    })
                                }
                                className={'input input-bordered w-full'}
                            />
                        </div>

                        {/* имя */}
                        {isRegister && (
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">
                                        Имя
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    name="email"
                                    value={formData.name}
                                    placeholder="мегатрон"
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            name: e.target.value,
                                        })
                                    }
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
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        password: e.target.value,
                                    })
                                }
                                className={`input input-bordered w-full `}
                            />
                        </div>

                        {errorMessage && (
                            <div className="alert alert-error text-sm">
                                <span>{errorMessage}</span>
                            </div>
                        )}

                        {/* Кнопка отправки */}
                        <div className="form-control mt-6">
                            <button
                                type="submit"
                                className={`btn btn-primary w-full`}
                                disabled={isPending}
                            >
                                {isPending ? 'Вход...' : `${buttonText}`}
                            </button>
                        </div>
                    </form>

                    {/* Дополнительная информация */}
                    <div className="divider">или</div>
                    <div className="text-center">
                        <p className="text-sm">
                            {isLogin && (
                                <>
                                    <span>Нет аккаунта? </span>
                                    <Link
                                        to="/registration"
                                        className="link link-primary"
                                    >
                                        Зарегистрироваться
                                    </Link>
                                </>
                            )}
                            {isRegister && (
                                <>
                                    <span>Есть аккаунт? </span>
                                    <Link
                                        to="/login"
                                        className="link link-primary"
                                    >
                                        Войти
                                    </Link>
                                </>
                            )}
                        </p>
                    </div>

                    {isLogin && (
                        <div className="alert alert-info mt-4 text-sm">
                            <InfoIcon className="w-5 h-5" />
                            <span>Демо: test@example.com / password123</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AuthForm
