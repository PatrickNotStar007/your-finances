import { useMutation } from '@tanstack/react-query'
import type { AuthResponse, LoginCredentials } from '../types/auth.types'
import { authApi } from '../lib/api/auth.api'
import { useNavigate } from 'react-router'

export const useLogin = () => {
    const navigate = useNavigate()

    return useMutation({
        mutationFn: (credentials: LoginCredentials) =>
            authApi.login(credentials),
        onSuccess: (data: AuthResponse) => {
            localStorage.setItem('auth_token', data.token)
            localStorage.setItem('user_name', data.userName)
            localStorage.setItem('user_id', data.userId)
            navigate('/dashboard')
            console.log('успешный логин')
        },
        onError: (error: any) => console.error('ОШИБКА ЛОГИНА'),
    })
}
