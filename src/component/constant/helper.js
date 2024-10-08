export const formateDate = (date) => {
    return date ? new Date(date)?.toISOString().split('T')[0] : ""
}