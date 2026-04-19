import { Navigate } from 'react-router'
import { getCurrentUser } from '../lib/helpers/auth.helpers'

interface ProtectedRouteProps {
    children: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const user = getCurrentUser()

    if (!user) return <Navigate to="/login" />

    return children
}

export default ProtectedRoute
