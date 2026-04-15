import { UnauthorizedError } from '../errors/common.errors'
import { DateFormatError, DateRangeError } from '../errors/transaction.errors'
import { AuthRequest } from '../middleware/auth.middleware'

export const getUserId = (req: AuthRequest) => {
    if (!req.user) throw new UnauthorizedError()
    return req.user.id
}

export const validateDateFormat = (
    startDateStr?: string,
    endDateStr?: string
) => {
    if (startDateStr && isNaN(new Date(startDateStr).getTime()))
        throw new DateFormatError()
    if (endDateStr && isNaN(new Date(endDateStr).getTime()))
        throw new DateFormatError()
}

export const validateDateRange = (
    startDateStr?: string,
    endDateStr?: string
) => {
    if (
        startDateStr &&
        endDateStr &&
        new Date(startDateStr) > new Date(endDateStr)
    )
        throw new DateRangeError()
}
