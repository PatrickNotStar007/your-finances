import { useCurrentUser } from '../hooks/auth.hooks'
import { Navigate } from 'react-router'

interface ProtectedRouteProps {
    children: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const user = useCurrentUser()

    if (!user) return <Navigate to="/login" />

    return <div>ProtectedRoute</div>
}

export default ProtectedRoute
