import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import Scoreboard from './Scoreboard'
import Timer from './Timer'
import Match from './Match'
import Meta from './Meta'

import style from './index.module.scss'

const Translation = () => {
  const { tv } = useSelector(state => state.tv)
  const { settings } = useSelector(state => state.settings)
  const { liveTimer } = useSelector(state => state.liveTimer)
  const [video, setVideo] = useState()
  const [init, setInit] = useState()
  const videoRef = useRef(null)
  const stingerRef = useRef(null)

  useEffect(() => {
    const playPromise = videoRef.current?.play()

    if (playPromise !== undefined) {
      playPromise
        .then(_ => {
          videoRef.currentTime = init
          videoRef.current.play()
          console.log(init)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }, [video])

  return (
    <div className={style.block}>
      <video preload="none" className={style.video} src={video} ref={videoRef} muted />
      <video className={style.decor} src={settings.account.transition} ref={stingerRef} muted />
      <div>
        <div className={style.info}>
          <Scoreboard
            data={tv.event.league.matches[0]}
            timer={liveTimer}
            setVideo={setVideo}
            stingerRef={stingerRef}
            setInit={setInit}
          />
          <Timer timer={liveTimer} />
        </div>
      </div>
      <div className={style.table}>
        {tv.event.league.matches.map((item, index) => (
          <Match key={index} index={index} data={item} timer={liveTimer} />
        ))}
      </div>
      <div className={style.meta}>
        <Meta data={tv} />
      </div>
    </div>
  )
}

export default Translation
