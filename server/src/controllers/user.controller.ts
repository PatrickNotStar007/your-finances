import type { Request, Response } from 'express'
import { Prisma } from '../generated/prisma/client'
import { prisma } from '../utils/prisma.service'

export const userController = {
    async create(req: Request, res: Response) {
        try {
            const { name, email, passwordHash } = req.body

            if (!name || !email || !passwordHash)
                return res
                    .status(401)
                    .json({ error: 'Поля name, email и password обязательны' })

            const user = await prisma.user.create({ data: req.body })
            res.status(200).json(user)
        } catch (e) {
            console.error('Ошибка при создании пользователя: ', e)
            res.status(500).json({ error: 'Не удалось создать пользователя' })
        }
    },

    async findById(id: string) {
        const user = await prisma.user.findUnique({ where: { id } })
        return user
    },

    async update(id: string, data: Prisma.UserUpdateInput) {
        const user = await prisma.user.update({ where: { id }, data })
        return user
    },
}
