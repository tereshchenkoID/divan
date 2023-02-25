export const useCurrentTimezone = () => {
    const date = new Date()
    return date.getTimezoneOffset()
}
