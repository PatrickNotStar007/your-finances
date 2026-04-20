import type {
    AuthResponse,
    LoginCredentials,
    RegisterCredentials,
} from '../../types/auth.types'
import { api } from '../axios'

export const authApi = {
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const { data } = await api.post<AuthResponse>(
            '/auth/login',
            credentials
        )
        return data
    },

    register: async (
        credentials: RegisterCredentials
    ): Promise<AuthResponse> => {
        const { data } = await api.post<AuthResponse>(
            '/auth/registration',
            credentials
        )
        console.log(data)

        return data
    },
}
