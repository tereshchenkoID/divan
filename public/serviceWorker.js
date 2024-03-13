let timerID

self.addEventListener('message', function (event) {
  if (event.data === 'start') {
    timerID = setInterval(() => {
      self.postMessage('tick')
    }, 1000)
  } else if (event.data === 'stop') {
    clearInterval(timerID)
  }
})
