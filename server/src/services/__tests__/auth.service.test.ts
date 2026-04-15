import { prisma } from '../../utils/prisma.service'
import bcrypt from 'bcrypt'
import { authService } from '../auth.service'
import { UserAlreadyExistsError } from '../../errors/auth.errors'

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
const mockBcryptCompaerSync = bcrypt.compareSync as jest.Mock

describe('AuthService', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe('registration', () => {
        const email = 'test@example.com'
        const name = 'Test User'
        const password = 'password123'
        const mockCreatedUser = {
            id: '1',
            email,
            name,
            passwordHash: 'hashed_password',
        }

        it('должен успешно создать пользователя, если email не занят', async () => {
            mockPrismaFindUnique.mockResolvedValue(null)
            mockBcryptHashSync.mockReturnValue('hashed_password')
            mockPrismaCreate.mockResolvedValue(mockCreatedUser)

            const result = await authService.registration(email, name, password)

            expect(mockPrismaFindUnique).toHaveBeenCalledWith({
                where: { email },
            })
            expect(mockBcryptHashSync).toHaveBeenCalledTimes(1)
            expect(mockBcryptHashSync).toHaveBeenCalledWith(password, 10)
            expect(mockPrismaCreate).toHaveBeenCalledWith({
                data: { email, name, passwordHash: 'hashed_password' },
            })
            expect(result).toEqual(mockCreatedUser)
        })

        it('должен выбросить ошибку UserAlreadyExistsError, если email уже занят', async () => {
            mockPrismaFindUnique.mockResolvedValue({ id: '1', email })

            await expect(
                authService.registration(email, 'name', 'password')
            ).rejects.toThrow(UserAlreadyExistsError)

            expect(mockPrismaCreate).not.toHaveBeenCalled()
        })
    })
})
