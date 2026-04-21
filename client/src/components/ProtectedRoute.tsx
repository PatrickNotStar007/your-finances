import { Navigate } from 'react-router'
import { useAuth } from '../hooks/auth.hooks'

interface ProtectedRouteProps {
    children: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isAuthenticated } = useAuth()

    if (!isAuthenticated) return <Navigate to="/login" />

    return children
}

export default ProtectedRoute
