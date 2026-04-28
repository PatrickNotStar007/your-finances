import express from 'express'
import cors from 'cors'

import { ENV } from './config/env'
import authRouter from './routes/auth.router'
import { authMiddleware } from './middleware/auth.middleware'
import transactionRouter from './routes/transaction.router'
import { errorHandler } from './middleware/error.middleware'
import analyticsRouter from './routes/analytics.router'

const app = express()

const port = Number(ENV.PORT)

app.use(cors({ origin: ENV.FRONTEND_URL, credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/auth', authRouter)
app.use(authMiddleware)
app.use('/transactions', transactionRouter)
app.use('/analytics', analyticsRouter)
app.use(errorHandler)

app.listen(port, '0.0.0.0', () => {
    console.log(`Сервер запущен на порту http://localhost:${port}`)
})
