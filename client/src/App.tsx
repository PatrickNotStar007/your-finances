import { Route, Routes } from 'react-router'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'

function App() {
    return (
        <div className="min-h-screen bg-base-100">
            <Navbar />
            <main className="max-w-5xl m-auto px-4 py-8">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </main>
        </div>
    )
}

export default App
