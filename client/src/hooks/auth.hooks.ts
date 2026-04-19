import { useMutation } from '@tanstack/react-query'
import type { AuthResponse, LoginCredentials } from '../types/auth.types'
import { authApi } from '../lib/api/auth.api'

export const useLogin = () => {
    const a = useMutation({
        mutationFn: (credentials: LoginCredentials) =>
            authApi.login(credentials),
        onSuccess: (data: AuthResponse) =>
            localStorage.setItem('auth_token', data.token),
    })
}

export const useCurrentUser = () => {
    return null
}
