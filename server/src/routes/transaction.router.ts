import { Router } from 'express'
import { transactionController } from '../controllers/transaction.controller'
import { transactionValidate } from '../validation/transaction.validation'

const transactionRouter = Router()

transactionRouter.get('/', transactionController.getAll)
transactionRouter.get('/:id', transactionController.getById)
transactionRouter.post('/', transactionValidate, transactionController.create)
transactionRouter.delete('/:id', transactionController.delete)

export default transactionRouter
