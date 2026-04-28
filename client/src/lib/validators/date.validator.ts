export const isStartDateAfterEndDate = (startDate?: Date, endDate?: Date) => {
    return startDate && endDate && startDate > endDate
}
