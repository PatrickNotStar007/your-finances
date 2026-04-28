import dotenv from 'dotenv'

dotenv.config({ quiet: true })

export const ENV = {
    PORT: process.env.PORT || 5000,
    DATABASE_URL: process.env.DATABASE_URL,
    FRONTEND_URL: process.env.FRONTEND_URL,
    SECRET_JWT: process.env.SECRET_JWT,
}
