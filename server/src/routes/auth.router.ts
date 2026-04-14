import { Router } from 'express'
import { authController } from '../controllers/auth.controller'

import {
    emailValidation,
    nameValidation,
    passwordValidation,
} from '../validation/auth.validation'

const authRouter = Router()

authRouter.post(
    '/registration',
    [...emailValidation, ...passwordValidation, ...nameValidation],
    authController.registration
)
authRouter.post(
    '/login',
    [...emailValidation, ...passwordValidation],
    authController.login
)

export default authRouter
