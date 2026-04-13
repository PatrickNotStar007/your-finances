import express from 'express'
import cors from 'cors'

import { ENV } from './config/env'
import authRouter from './routes/auth.router'
import { authMiddleware } from './middleware/auth.middleware'
import transactionRouter from './routes/transaction.router'

const app = express()
const port = 5000

app.use(cors({ origin: ENV.FRONTEND_URL }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/auth', authRouter)

app.use(authMiddleware)

app.use('/transactions', transactionRouter)

app.listen(port, () => {
    console.log(`Сервер запущен на порту http://localhost:${ENV.PORT}`)
})
