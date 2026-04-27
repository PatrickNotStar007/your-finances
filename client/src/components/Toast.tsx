interface ToastProps {
    message: string
}

const Toast = ({ message }: ToastProps) => {
    return (
        <div className="toast">
            <div
                className={`alert ${message.includes('успешно') ? 'alert-success' : 'alert-error'} `}
            >
                <span className="text-white">{message}</span>
            </div>
        </div>
    )
}

export default Toast
