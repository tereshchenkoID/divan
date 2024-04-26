let timerID

const getDifferent = (data, delta) => {
  const now = new Date()
  const c = now.getTime() + delta
  const o = now.getTimezoneOffset() * 60 * 1000
  const r = new Date(data - c + o)
  let result = '00:00:00:00'

  if (data > c) {
    result = `${('0' + (r.getDate() - 1)).slice(-2)}:${('0' + r.getHours()).slice(-2)}:${('0' + r.getMinutes()).slice(-2)}:${('0' + r.getSeconds()).slice(-2)}`
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

// const TYPES = ['webp', 'jpg', 'jpeg', 'css', 'css2', 'js', 'woff2', 'json']
// const CACHE_NAME = 'static'
//
// self.addEventListener('install', event => {
//   event.waitUntil(
//     (async () => {
//       const cache = await caches.open(CACHE_NAME)
//       await cache.addAll([])
//       self.skipWaiting()
//     })(),
//   )
// })
//
// self.addEventListener('activate', event => {
//   event.waitUntil(self.clients.claim())
// })
//
// self.addEventListener('fetch', event => {
//   event.respondWith(
//     caches.open(CACHE_NAME).then(async cache => {
//       const cachedResponse = await cache.match(event.request)
//
//       if (cachedResponse) {
//         return cachedResponse
//       }
//
//       const requestURL = new URL(event.request.url)
//       const extension = requestURL.pathname.split('.').pop()
//
//       if (TYPES.includes(extension)) {
//         console.log(extension)
//
//         const fetchResponse = await fetch(event.request)
//         cache.put(event.request, fetchResponse.clone())
//         return fetchResponse
//       }
//
//       return fetch(event.request)
//     }),
//   )
// })

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
