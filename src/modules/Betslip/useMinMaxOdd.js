export const useMinMaxOdd = (data, type) => {
    const a = data.slice(0).sort((a, b) => type === 0 ? a.b - b.b : b.b - a.b)[0]
    return a ? a.b : 0;
}
