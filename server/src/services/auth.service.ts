import { prisma } from '../utils/prisma.service'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { ENV } from '../config/env'

const generateToken = (name: string, id: string) => {
    const payload = { name, id }

    const secret = ENV.SECRET_JWT

    if (!secret) {
        throw new Error('SECRET_JWT не определен в переменных окружения')
    }

    return jwt.sign(payload, secret, { expiresIn: '24h' })
}

export const authService = {
    async registration(email: string, name: string, password: string) {
        const existingUser = await prisma.user.findUnique({
            where: { email },
        })

        if (existingUser)
            throw new Error('Пользователь с такой почтой уже существует')

        const passwordHash = bcrypt.hashSync(password, 10)

        return await prisma.user.create({
            data: {
                email,
                name,
                passwordHash,
            },
        })
    },

    async login(email: string, password: string) {
        const user = await prisma.user.findUnique({
            where: { email },
        })

        if (!user) {
            throw new Error('Пользователь не найден')
        }

        const validPassword = bcrypt.compareSync(password, user.passwordHash)

        if (!validPassword) {
            throw new Error('Неверный email или пароль')
        }

        const token = generateToken(user.name, user.id)

        return token
    },
}
