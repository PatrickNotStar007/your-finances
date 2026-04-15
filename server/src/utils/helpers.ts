import { UnauthorizedError } from '../errors/common.errors'
import { AuthRequest } from '../middleware/auth.middleware'

export const getUserId = (req: AuthRequest) => {
    if (!req.user) throw new UnauthorizedError()
    return req.user.id
}
