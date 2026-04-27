import { useEffect, useState } from 'react'

const useToast = () => {
    const [isVisible, setIsVisible] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => setIsVisible(false), 3000)
            return () => clearTimeout(timer)
        }
    }, [isVisible])

    const showToast = (message: string, type: 'success' | 'error') => {
        setMessage(message)
        setIsVisible(true)
    }

    return { showToast, isVisible, message }
}

export default useToast
