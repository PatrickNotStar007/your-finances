import { Router } from 'express'
import { transactionController } from '../controllers/transaction.controller'
import { transactionValidate } from '../validation/transaction.validation'

const transactionRouter = Router()

transactionRouter.post('/', transactionValidate, transactionController.create)

export default transactionRouter
