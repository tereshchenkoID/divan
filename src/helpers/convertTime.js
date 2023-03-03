export const convertTime = (data, delta) => {
    const date = new Date(data + delta);
    return ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2);
}

export default convertTime
