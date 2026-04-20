import type { AxiosError } from 'axios'

interface ApiErrorData extends Error {
    status: number
    message: string
}

export type ApiError = AxiosError<ApiErrorData>
