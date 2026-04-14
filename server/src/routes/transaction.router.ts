import { Router } from 'express'
import { transactionController } from '../controllers/transaction.controller'
import {
    transactionCreateValidate,
    transactionUpdateValidate,
} from '../validation/transaction.validation'

const transactionRouter = Router()

transactionRouter.get('/', transactionController.getAll)
transactionRouter.post(
    '/',
    transactionCreateValidate,
    transactionController.create
)
transactionRouter.get('/:id', transactionController.getById)
transactionRouter.put(
    '/:id',
    transactionUpdateValidate,
    transactionController.update
)
transactionRouter.delete('/:id', transactionController.delete)

export default transactionRouter
