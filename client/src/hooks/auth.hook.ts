import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type {
    AuthResponse,
    LoginCredentials,
    RegisterCredentials,
} from '../types/auth.types'
import { authApi } from '../lib/api/auth.api'
import { useNavigate } from 'react-router'
import { clearCredentials, setCredentials } from '../lib/helpers/auth.helpers'

const AUTH_QUERY_KEY = ['auth', 'user']

const useAuthMutation = <TCredentials>(
    mutationFn: (credentials: TCredentials) => Promise<AuthResponse>
) => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    return useMutation({
        mutationFn,
        onSuccess: (data: AuthResponse) => {
            setCredentials(data)
            queryClient.setQueryData(AUTH_QUERY_KEY, {
                isAuthenticated: true,
                token: data.token,
                userId: data.userId,
                userName: data.userName,
            })
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

export const useLogout = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    return useMutation({
        mutationFn: async () => clearCredentials(),
        onSuccess: () => {
            queryClient.setQueryData(AUTH_QUERY_KEY, null)
            navigate('/login', { replace: true })
        },
    })
}

export const useAuth = () => {
    const { data: user, isLoading } = useQuery({
        queryKey: AUTH_QUERY_KEY,
        queryFn: () => {
            const token = localStorage.getItem('auth_token')
            const userName = localStorage.getItem('user_name')
            const userId = localStorage.getItem('user_id')

            if (!token) return null

            return { isAuthenticated: true, userName, userId, token }
        },
    })

    return { ...user, isLoading }
}
