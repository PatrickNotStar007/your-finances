import type { AuthResponse } from '../../types/auth.types'

export const setCredentials = (data: AuthResponse) => {
    localStorage.setItem('auth_token', data.token)
    localStorage.setItem('user_name', data.userName)
    localStorage.setItem('user_id', data.userId)
}

export const clearCredentials = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_name')
    localStorage.removeItem('user_id')
}
