import { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setVideo } from 'store/LIVE/actions/videoAction'

import Scoreboard from './Scoreboard'
import Timer from './Timer'
import Match from './Match'
import Meta from './Meta'
import Video from './Video'

import style from './index.module.scss'

const calculatePeriod = (timer, delay) => (timer > delay ? Math.ceil(Number(timer) / delay) - 1 : 0)

const Translation = () => {
  const dispatch = useDispatch()
  const { tv } = useSelector(state => state.tv)
  const { settings } = useSelector(state => state.settings)
  const { progress } = useSelector(state => state.progress)
  const { liveTimer } = useSelector(state => state.liveTimer)
  const [period, setPeriod] = useState(null)
  const [init, setInit] = useState(true)

  const stingerRef = useRef(null)
  const TIME = 90
  const DELAY = 15

  useEffect(() => {
    if (progress === 2) {
      setPeriod(calculatePeriod(liveTimer, DELAY))
    }
  }, [tv.event.id, liveTimer])

  useEffect(() => {
    if (progress === 1) {
      dispatch(setVideo(tv.event.league.matches[0].scenes.map(el => el.video) || null))
    }

    if(progress === 2) {
      if(init) {
        setInit(false)

        if(liveTimer !== 0) {
          dispatch(setVideo(tv.event.league.matches[0].scenes.slice(calculatePeriod(liveTimer, DELAY), tv.event.league.matches[0].scenes.length).map(el => el.video) || null))
        }
      }
    }
  }, [tv.event.id, progress, init, period, liveTimer, DELAY, dispatch])

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
      console.log("clear")
      dispatch(setVideo(null))
    }
  }, [])

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

      <Video data={tv} period={period} time={liveTimer} />
    </div>
  )
}

export default Translation
