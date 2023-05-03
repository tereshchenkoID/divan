const getDifferent = (update, delta) => {
    const c = new Date().getTime() + delta
    let r = 0, result = '0'

    if (update > c) {
        r = new Date(update - c)
        result = `${('0' + r.getMinutes()).slice(-2)}:${('0' + r.getSeconds()).slice(-2)}`
    }

    return result
}


const progressTimer = (update, delta) => {
    return getDifferent(update, delta)
}

export default progressTimer;
