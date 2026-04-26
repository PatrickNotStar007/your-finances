export const toDate = (value: Date | undefined): Date => {
    if (!value) return new Date()
    return new Date(value)
}
