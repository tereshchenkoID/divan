const MAX = 90

const getDifferent = (update, delta) => {
    const c = new Date().getTime() + delta
    let r = 0, result = '0'

    if (update > c) {
        r = new Date(update - c)
        result = MAX - (r.getSeconds() + (r.getMinutes() * 60))
    }

    return result
}

const progressTimer = (update, delta) => {
    return getDifferent(update, delta)
}

export default progressTimer;
