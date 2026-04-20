import { useMutation } from '@tanstack/react-query'
import type {
    AuthResponse,
    LoginCredentials,
    RegisterCredentials,
} from '../types/auth.types'
import { authApi } from '../lib/api/auth.api'
import { useNavigate } from 'react-router'

const setCredentials = (data: AuthResponse) => {
    localStorage.setItem('auth_token', data.token)
    localStorage.setItem('user_name', data.userName)
    localStorage.setItem('user_id', data.userId)
}

const useAuthMutation = <TCredentials>(
    mutationFn: (credentials: TCredentials) => Promise<AuthResponse>
) => {
    const navigate = useNavigate()

    return useMutation({
        mutationFn,
        onSuccess: (data: AuthResponse) => {
            setCredentials(data)
            navigate('/dashboard', { replace: true })
        },
    })
}

export const useLogin = () => {
    return useAuthMutation<LoginCredentials>((credentials: LoginCredentials) =>
        authApi.login(credentials)
    )
}

export const useRegister = () => {
    return useAuthMutation<RegisterCredentials>(
        (credentials: RegisterCredentials) => authApi.register(credentials)
    )
}
