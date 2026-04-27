import { Navigate, Route, Routes } from 'react-router'
import Navbar from './components/Navbar'
import DashboardPage from './pages/DashboardPage'
import Login from './components/forms/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Register from './components/forms/Register'

function App() {
    return (
        <div className="min-h-screen bg-base-100">
            <Navbar />
            <main className="max-w-5xl mx-auto px-0 sm:px-4 py-8">
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
                    <Route path="/registration" element={<Register />} />
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                </Routes>
            </main>
        </div>
    )
}

export default App
