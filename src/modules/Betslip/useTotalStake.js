export const useTotalStake = (data) => {
    let result = 0

    for(let i = 0; i < data.length; i++) {
        result += data[i].stake
    }

    return result
}
