const deleteBets = (data, id) => {
    const a = []

    for(let i = 0; i < data.length; i++) {
        if (data[i].sid !== id) {
            a.push(data[i])
        }
    }

    return a
}

export const clearActiveBets = (data, id) => {
    if (data) {
        const f = data.find(el => {
            return el.sid === id
        })

        return f ? deleteBets(data, id) : null
    }
    else {
        return null
    }
}
