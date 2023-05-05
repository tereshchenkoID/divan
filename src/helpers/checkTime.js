export const checkTime = (start, delta) => {
    return start > (new Date().getTime() + delta)
}
