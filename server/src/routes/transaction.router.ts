import { Router } from 'express'
import { transactionController } from '../controllers/transaction.controller'
import { transactionValidate } from '../validation/transaction.validation'

const transactionRouter = Router()

transactionRouter.get('/', transactionController.getAll)
transactionRouter.post('/', transactionValidate, transactionController.create)

export default transactionRouter
