export const getTimerFormat = (data, type = 0) => {
  let a = data || '00:00:00:00'

  if (type === 0) {
    return a.slice(-5)
  } else if (type === 1) {
    return `${Number(a.slice(0, 2))}d ${a.slice(3, 8)}`
  }
}
