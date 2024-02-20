export const getDifferent = (data, delta, type = 0) => {
  const c = new Date().getTime() + delta
  let r = 0,
    result = '0'

  if (data > c) {
    r = new Date(data - c)

    if (type === 0) {
      result = `${('0' + r.getMinutes()).slice(-2)}:${('0' + r.getSeconds()).slice(-2)}`
    } else {
      result = r.getMinutes() * 60 + r.getSeconds()
    }
  }

  return result
}
