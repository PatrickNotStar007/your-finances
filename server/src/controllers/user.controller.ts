import { type Request, type Response } from 'express'
import { Prisma } from '../generated/prisma/client'
import { prisma } from '../utils/prisma.service'

export const userController = {
    async create(req: Request, res: Response) {
        try {
            const { name, email, password } = req.body

            if (!name || !email || !password)
                throw new Error('Поля name и email обязательны')

            const user = await prisma.user.create({ data: req.body })
            res.status(201).json(user)
        } catch (e) {
            console.log(e)
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
