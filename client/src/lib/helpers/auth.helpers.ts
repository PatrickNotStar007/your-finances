export const getCurrentUser = () => {
    const id = localStorage.getItem('user_id')
    const name = localStorage.getItem('user_name')
    const token = localStorage.getItem('auth_token')

    if (!id || !name || !token) return null

    return { id, name, token }
}
