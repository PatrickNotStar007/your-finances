import { useMutation, type MutationFunction } from '@tanstack/react-query'
import type {
    AuthResponse,
    LoginCredentials,
    RegisterCredentials,
} from '../types/auth.types'
import { authApi } from '../lib/api/auth.api'
import { useNavigate } from 'react-router'

// const setCredentials = (data: AuthResponse) => {
//     localStorage.setItem('auth_token', data.token)
//     localStorage.setItem('user_name', data.userName)
//     localStorage.setItem('user_id', data.userId)
// }

// const useAuthMutation = (mutationFn: any) => {
//     const navigate = useNavigate()

//     return useMutation({
//         mutationFn,
//         onSuccess: (data: AuthResponse) => {
//             setCredentials(data)
//             navigate('/dashboard')
//         },
//         onError: (error: any) => console.error('ОШИБКА', error),
//     })
// }

// export const useLogin = () => {
//     return useAuthMutation((credentials: LoginCredentials) =>
//         authApi.login(credentials)
//     )
// }

// export const useRegister = () => {
//     return useAuthMutation((credentials: RegisterCredentials) =>
//         authApi.register(credentials)
//     )
// }

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
        onError: (error: any) => console.error('ОШИБКА ЛОГИНА', error),
    })
}

export const useRegister = () => {
    const navigate = useNavigate()
    return useMutation({
        mutationFn: (credentials: RegisterCredentials) =>
            authApi.register(credentials),
        onSuccess: (data: AuthResponse) => {
            localStorage.setItem('auth_token', data.token)
            localStorage.setItem('user_name', data.userName)
            localStorage.setItem('user_id', data.userId)
            navigate('/dashboard')
            console.log('успешная регистрация')
        },
        onError: (error: any) => console.error('ОШИБКА РЕГИСТРАЦИИ', error),
    })
}
