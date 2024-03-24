export const getDifferentPeriod = (start, end, delta) => {
  const MAX = 90
  const c = new Date().getTime() + delta

  let r = 0,
    result = '90'

  if (end > c) {
    r = new Date(end - c)
    result = MAX - (r.getSeconds() + r.getMinutes() * 60)
  }

  return result
}
