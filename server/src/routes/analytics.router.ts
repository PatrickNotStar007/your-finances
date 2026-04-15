import { Router } from 'express'
import { analyticsController } from '../controllers/analytics.controller'

const analyticsRouter = Router()

analyticsRouter.use('/summary', analyticsController.getSummary)

export default analyticsRouter
