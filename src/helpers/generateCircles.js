export const generateCircles = (data, colors) => {
  const circles = []

  data.split(',').map(el => {
    circles.push({
      id: el,
      color: colors[el - 1],
    })

    return true
  })

  return circles
}
