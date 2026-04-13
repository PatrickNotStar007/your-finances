import { check } from 'express-validator'

export const emailValidation = [
    check('email', 'Неверный формат почты').isEmail(),
    check('email', 'Почта должна быть 8-30 символов').isLength({
        min: 8,
        max: 30,
    }),
]

export const passwordValidation = [
    check('password', 'Пароль должен быть 8-10 символов').isLength({
        min: 8,
        max: 20,
    }),
]

export const nameValidation = [
    check('name', 'Имя должно быть 3-20 символов').isLength({
        min: 3,
        max: 20,
    }),
]
