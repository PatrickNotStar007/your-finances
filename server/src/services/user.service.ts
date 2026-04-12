import { Prisma } from '../generated/prisma/client'
import { prisma } from '../utils/prisma.service'

export const userService = {
    async create(data: Prisma.UserCreateInput) {
        const existingUser = await prisma.user.findUnique({
            where: { email: data.email },
        })

        if (existingUser)
            throw new Error('Пользователь с такой почтой уже существует')

        return await prisma.user.create({ data })
    },
}
