let timerID

const getDifferent = (data, delta, game) => {
  const c = new Date().getTime() + delta
  let r = new Date(data - c),
    result = '00:00'

  if (data > c) {
    result = `${('0' + r.getMinutes()).slice(-2)}:${('0' + r.getSeconds()).slice(-2)}`
  }
  return {
    time: result,
    update: c,
    game,
  }
}

self.addEventListener('install', event => {
  console.log('Installing [Service Worker]')
  event.waitUntil(
    caches.open('static').then(cache => {
      console.log('[Service Worker] Precaching App Shell')
      cache.addAll([
        '/index.html',
        '/img/decor/LIVE/JACKPOT/bronze.webp',
        '/img/decor/LIVE/JACKPOT/gold.webp',
        '/img/decor/LIVE/JACKPOT/silver.webp',
        '/img/decor/LIVE/TIMER/circle.webp',
        '/img/decor/LIVE/TIMER/light.webp',
        '/img/ROULETTE/chips/black.webp',
        '/img/ROULETTE/chips/blue.webp',
        '/img/ROULETTE/chips/green.webp',
        '/img/ROULETTE/chips/orange.webp',
        '/img/ROULETTE/chips/red.webp',
        '/img/ROULETTE/chips/violet.webp',
        '/img/ROULETTE/decor/black.webp',
        '/img/ROULETTE/decor/red.webp',
        '/locales/en/translation.json',
        '/locales/ukr/translation.json',
      ])
    }),
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response
      } else {
        return fetch(event.request)
      }
    }),
  )
})

self.addEventListener('message', event => {
  if (event.data.type === 'start') {
    timerID = setInterval(() => {
      const difference = getDifferent(event.data.currentTime, event.data.delta, event.data.game)
      self.postMessage(difference)
    }, 1000)
  } else if (event.data === 'stop') {
    clearInterval(timerID)
  }
})
