export const formateDate = (date) => {
    return new Date(date)?.toISOString().split('T')[0]
}