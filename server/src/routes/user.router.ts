import { Router } from 'express'
import { prisma } from '../utils/prisma.service'
import { userController } from '../controllers/user.controller'

const userRouter = Router()

userRouter.post('/', userController.create)

export default userRouter
