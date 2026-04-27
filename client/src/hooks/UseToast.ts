import { useEffect, useState } from 'react'
import type { ToastType } from '../types/toast.types'

const useToast = () => {
    const [isVisible, setIsVisible] = useState(false)
    const [toastMessage, setMessage] = useState('')
    const [toastType, setToastType] = useState<ToastType>('success')

    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => setIsVisible(false), 3000)
            return () => clearTimeout(timer)
        }
    }, [isVisible])

    const showToast = (message: string, type: ToastType) => {
        setToastType(type)
        setMessage(message)
        setIsVisible(true)
    }

    return { showToast, isVisible, toastMessage, toastType }
}

export default useToast
