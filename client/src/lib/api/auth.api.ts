import type {
    AuthResponse,
    LoginCredentials,
    RegisterCredentials,
} from '../../types/auth.types'
import { api } from '../axios'

export const authApi = {
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        try {
            const { data } = await api.post<AuthResponse>(
                '/auth/login',
                credentials
            )
            return data
        } catch (e) {
            console.log(e)
        }
        return { token: '', userId: '', userName: '' }
    },

    register: async (
        credentials: RegisterCredentials
    ): Promise<AuthResponse> => {
        const { data } = await api.post<AuthResponse>(
            '/auth/registration',
            credentials
        )
        return data
    },
}
