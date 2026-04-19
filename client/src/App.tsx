import { Navigate, Route, Routes } from 'react-router'
import Navbar from './components/Navbar'
import DashboardPage from './pages/DashboardPage'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
    return (
        <div className="min-h-screen bg-base-100">
            <Navbar />
            <main className="max-w-5xl m-auto px-4 py-8">
                <Routes>
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <DashboardPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                </Routes>
            </main>
        </div>
    )
}

export default App
