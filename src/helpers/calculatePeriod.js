export const calculatePeriod = (timer, delay) => (timer > delay ? Math.ceil(Number(timer) / delay) - 1 : 0)
