import { NextFunction, Response } from 'express'
import { AuthRequest } from '../middleware/auth.middleware'
import { analyticsService } from '../services/analytics.service'
import { getUserId } from '../utils/helpers'

export const analyticsController = {
    async getSummary(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const userId = getUserId(req)
            const startDateStr = req.query.startDate as string
            const endDateStr = req.query.endDate as string

            const summary = await analyticsService.getSummary(
                userId,
                startDateStr,
                endDateStr
            )

            return res.status(200).json(summary)
        } catch (e) {
            next(e)
        }
    },
}
