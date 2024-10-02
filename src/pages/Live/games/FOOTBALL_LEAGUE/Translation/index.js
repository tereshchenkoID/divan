import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import { preloadVideo } from 'helpers/preloadVideo'
import { calculatePeriod } from 'helpers/calculatePeriod'

import Scoreboard from './Scoreboard'
import Timer from './Timer'
import Match from './Match'
import Meta from './Meta'
// import Video from './Video'

import style from './index.module.scss'

const Translation = () => {
  const { tv } = useSelector(state => state.tv)
  const { settings } = useSelector(state => state.settings)
  const { progress } = useSelector(state => state.progress)
  const { liveTimer } = useSelector(state => state.liveTimer)
  const [period, setPeriod] = useState(null)
  const [stinger, setStinger] = useState()
  const [video, setVideo] = useState()

  const videoRef = useRef(null)
  const stingerRef = useRef(null)
  const TIME = 90
  const DELAY = 15

  const loadVideo = async () => {
    setStinger(await preloadVideo(settings.account.transition))
  }

  useEffect(() => {
    loadVideo()
  }, [])

  useEffect(() => {
    if (progress === 2) {
      setPeriod(calculatePeriod(liveTimer, DELAY))
    }
  }, [tv.event.id, liveTimer])

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
    const playPromise = videoRef.current?.play()

    if (playPromise !== undefined) {
      playPromise
        .then(_ => {})
        .catch(error => {
          console.log(error)
        })
    }
  }, [video])

  return (
    <div className={style.block}>
      {progress === 2 && (
        <>
          <video className={style.decor} src={stinger} ref={stingerRef} muted />
          <video className={style.video} src={video} ref={videoRef} muted />
          <div className={style.background} />
          {period !== null && (
            <div className={style.wrapper}>
              <div>
                <div className={style.info}>
                  <Scoreboard data={tv.event.league.matches[0]} timer={liveTimer} period={period} setVideo={setVideo} />
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

      {/* <Video data={tv} period={period} time={liveTimer} /> */}
    </div>
  )
}

export default Translation
