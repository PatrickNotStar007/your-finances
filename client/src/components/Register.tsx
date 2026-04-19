import AuthForm from './AuthForm'

const registerProps = {
    formType: 'register',
    title: 'Регистрация',
    buttonText: 'Зарегистрироваться',
}

const Register = () => {
    return <AuthForm config={registerProps} />
}

export default Register
