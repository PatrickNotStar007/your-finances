import { Router } from 'express'
import { authController } from '../controllers/auth.controller'
import { check } from 'express-validator'

const authRouter = Router()

authRouter.post(
    '/registration',
    [
        check('email', 'Почта должна быть 8-30 символов').isEmail().isLength({
            min: 8,
            max: 30,
        }),
        check('name', 'Имя должно быть 3-20 символов').isLength({
            min: 3,
            max: 20,
        }),
        check('password', 'Пароль должен быть 8-10 символов').isLength({
            min: 8,
            max: 20,
        }),
    ],
    authController.registration
)
authRouter.post('/login', authController.login)

export default authRouter
