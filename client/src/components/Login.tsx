import AuthForm from './AuthForm'

const loginProps = {
    formType: 'login',
    title: 'Вход в систему',
    buttonText: 'Войти',
}

const LoginForm = () => {
    return <AuthForm config={loginProps} />
}

export default LoginForm
