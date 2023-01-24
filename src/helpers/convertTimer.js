export const convertTimer = (data) => {
    return data < 10 ? `0${data}`: data
}

export default convertTimer
