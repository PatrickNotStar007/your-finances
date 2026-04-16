import { prisma } from '../../utils/prisma.service'
import bcrypt from 'bcrypt'
import jwt, { sign } from 'jsonwebtoken'
import { authService } from '../auth.service'
import {
    InvalidCredentialError,
    UserAlreadyExistsError,
    UserNotFoundError,
} from '../../errors/auth.errors'

jest.mock('bcrypt')
jest.mock('../../utils/prisma.service', () => ({
    prisma: {
        user: {
            findUnique: jest.fn(),
            create: jest.fn(),
        },
    },
}))

const mockPrismaFindUnique = prisma.user.findUnique as jest.Mock
const mockPrismaCreate = prisma.user.create as jest.Mock
const mockBcryptHashSync = bcrypt.hashSync as jest.Mock
const mockBcryptCompareSync = bcrypt.compareSync as jest.Mock

const testData = {
    validUser: {
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123',
        passwordHash: 'hashed_password',
    },
    anotherUser: {
        email: 'another@example.com',
        password: 'anotherpass123',
    },
    invalidUser: {
        email: 'bad@example.com',
        password: 'badpass123',
    },
}

describe('AuthService', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe('registration', () => {
        const { email, name, password, passwordHash } = testData.validUser
        const mockCreatedUser = { email, name, passwordHash }

        it('должен успешно создать пользователя, если email не занят', async () => {
            mockPrismaFindUnique.mockResolvedValue(null)
            mockBcryptHashSync.mockReturnValue('hashed_password')
            mockPrismaCreate.mockResolvedValue(mockCreatedUser)

            const result = await authService.registration(email, name, password)

            expect(mockPrismaFindUnique).toHaveBeenCalledWith({
                where: { email },
            })
            expect(mockBcryptHashSync).toHaveBeenCalledWith(password, 10)
            expect(mockPrismaCreate).toHaveBeenCalledWith({
                data: { email, name, passwordHash },
            })
            expect(result).toEqual(mockCreatedUser)
        })

        it('должен выбросить ошибку UserAlreadyExistsError, если email уже занят', async () => {
            mockPrismaFindUnique.mockResolvedValue({ email })

            await expect(
                authService.registration(email, name, password)
            ).rejects.toThrow(UserAlreadyExistsError)

            expect(mockBcryptHashSync).not.toHaveBeenCalled()
            expect(mockPrismaCreate).not.toHaveBeenCalled()
        })
    })

    describe('login', () => {
        const { email, name, password, passwordHash } = testData.validUser
        const mockUser = { email, name, passwordHash }

        it('должен успешно войти и вернуть jwt токен', async () => {
            mockPrismaFindUnique.mockResolvedValue(mockUser)
            mockBcryptCompareSync.mockReturnValue(true)

            const token = await authService.login(email, password)

            expect(mockPrismaFindUnique).toHaveBeenCalledWith({
                where: { email },
            })
            expect(mockBcryptCompareSync).toHaveBeenCalledWith(
                password,
                passwordHash
            )
            expect(token).toEqual(
                expect.stringMatching(
                    /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/
                )
            )
        })

        it('должен выбросить UserNotFoundError для несуществующего email', async () => {
            mockPrismaFindUnique.mockResolvedValue(null)
            await expect(
                authService.login(
                    testData.anotherUser.email,
                    testData.anotherUser.password
                )
            ).rejects.toThrow(UserNotFoundError)
            expect(mockBcryptCompareSync).not.toHaveBeenCalled()
        })

        it('должен выбросить InvalidCredentialError при неправильном пароле', async () => {
            mockPrismaFindUnique.mockResolvedValue(mockUser)
            mockBcryptCompareSync.mockReturnValue(false)
            await expect(
                authService.login(
                    testData.invalidUser.email,
                    testData.invalidUser.password
                )
            ).rejects.toThrow(InvalidCredentialError)
        })
    })
})
