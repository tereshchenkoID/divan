export const useTotalStake = (data) => {
    let result = 0

    // eslint-disable-next-line array-callback-return
    data.map(el => {
        result += el.stake
    })

    return result
}
