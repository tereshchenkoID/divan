let timerID

const getDifferent = (data, delta) => {
  const c = new Date().getTime() + delta
  let r = new Date(data - c),
    result = '00:00'

  if (data > c) {
    result = `${('0' + r.getMinutes()).slice(-2)}:${('0' + r.getSeconds()).slice(-2)}`
  }
  return result
}

const setData = (data, next, delta) => {
  return {
    time: getDifferent(data, delta),
    next: getDifferent(next, delta),
    update: new Date().getTime() + delta,
  }
}

self.addEventListener('message', event => {
  if (event.data.type === 'start') {
    timerID = setInterval(() => {
      const difference = setData(event.data.currentTime, event.data.nextTime, event.data.delta)
      self.postMessage({
        ...difference,
        game: event.data.game,
        currentId: event.data.currentId,
        nextId: event.data.nextId,
      })
    }, 1000)
  } else if (event.data === 'stop') {
    clearInterval(timerID)
  }
})
