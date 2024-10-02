export const getDifferent = (data, delta, type = 0) => {
  const now = new Date()
  const c = now.getTime() + delta
  const o = now.getTimezoneOffset() * 60 * 1000
  let r = 0,
    result = '0'

  if (data > c) {
    r = new Date(data - c + o)

    if (type === 0) {
      result = `${('0' + r.getMinutes()).slice(-2)}:${('0' + r.getSeconds()).slice(-2)}`
    } else if (type === 2) {
      result = `${('0' + (r.getDate() - 1)).slice(-2)}:${('0' + r.getHours()).slice(-2)}:${('0' + r.getMinutes()).slice(-2)}:${('0' + r.getSeconds()).slice(-2)}`
    } else {
      result = r.getMinutes() * 60 + r.getSeconds()
    }
  }

  return result
}
