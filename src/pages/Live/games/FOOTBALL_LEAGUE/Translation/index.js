import { useEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import Scoreboard from './Scoreboard'
import Timer from './Timer'
import Match from './Match'
import Meta from './Meta'
import Video from './Video'

import style from './index.module.scss'

const calculatePeriod = (timer, delay) => (timer > delay ? Math.ceil(Number(timer) / delay) - 1 : 0)

const preloadVideos = async urls => {
  const videoPromises = urls.map(async url => {
    const response = await fetch(url, { mode: 'cors' })
    const videoBlob = await response.blob()
    return URL.createObjectURL(videoBlob)
  })
  return Promise.all(videoPromises)
}

const Translation = () => {
  const { tv } = useSelector(state => state.tv)
  const { settings } = useSelector(state => state.settings)
  const { progress } = useSelector(state => state.progress)
  const { liveTimer } = useSelector(state => state.liveTimer)
  const [preloadedVideos, setPreloadedVideos] = useState([])

  const stingerRef = useRef(null)

  const TIME = 90
  const DELAY = useMemo(() => Math.ceil(TIME / (tv.event.league.matches[0]?.scenes.length || 1)), [tv])
  const [period, setPeriod] = useState(null)
  const [scenes, setScenes] = useState(null)
  const [init, setInit] = useState(true)

  const loadVideos = async () => {
    const preloadedUrls = await preloadVideos(scenes)
    const preloadedCounts = tv.event.league.matches[0].scenes.length - preloadedUrls.length
    const nullArray = Array(preloadedCounts).fill(null)

    setPreloadedVideos(nullArray.fill(null).concat(preloadedUrls))
    setInit(false)
  }

  useEffect(() => {
    if (progress === 1 || progress || 2) {
      setScenes(
        tv.event.league.matches[0].scenes
          .slice(progress !== 2 ? 0 : calculatePeriod(liveTimer, DELAY), tv.event.league.matches[0].scenes.length)
          .map(el => el.video) || null,
      )

      // console.log(scenes)

      if (init && scenes) {
        loadVideos()
        setInit(false)
      }
    }

    if (progress === 2) {
      setPeriod(calculatePeriod(liveTimer, DELAY))
    }
  }, [tv.event.id, init, DELAY, liveTimer])

  useEffect(() => {
    if (progress === 2 && (period + 1) * 15 === liveTimer && liveTimer !== TIME) {
      stingerRef.current.play()
    }
  }, [period, liveTimer])

  useEffect(() => {
    if (progress !== 2) {
      setPeriod(null)
    }
  }, [progress])

  useEffect(() => {
    return () => {
      setInit(true)
    }
  }, [tv.event.id])

  return (
    <div className={style.block}>
      <video className={style.decor} src={settings.account.transition} ref={stingerRef} muted />

      {progress === 2 && (
        <>
          <div className={style.background} />
          {period !== null && (
            <div className={style.wrapper}>
              <div>
                <div className={style.info}>
                  <Scoreboard data={tv.event.league.matches[0]} timer={liveTimer} period={period} />
                  <Timer timer={liveTimer} />
                </div>
              </div>
              <div className={style.table}>
                {tv.event.league.matches.map((item, index) => (
                  <Match key={index} index={index} data={item} timer={liveTimer} period={period} />
                ))}
              </div>
              <div className={style.meta}>
                <Meta data={tv} />
              </div>
            </div>
          )}
        </>
      )}

      <Video data={tv} preloadedVideos={preloadedVideos} period={period} time={liveTimer} />
    </div>
  )
}

export default Translation
