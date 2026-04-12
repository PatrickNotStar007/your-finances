import express from 'express'
import cors from 'cors'

import { ENV } from './config/env'
import userRouter from './routes/user.router'

const app = express()
const port = 5000

app.use(cors({ origin: ENV.FRONTEND_URL }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/users', userRouter)

app.listen(port, () => {
    console.log(`Сервер запущен на порту http://localhost:${ENV.PORT}`)
})
